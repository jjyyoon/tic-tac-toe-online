from flask import Flask, jsonify, render_template, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt_claims, set_access_cookies, unset_jwt_cookies)
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO, emit, join_room, leave_room
from sqlalchemy import or_
import json

from game import make_grid, check_result

from models.database import db
from models.user import User
from models.room import Room
from models.game import Game

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config.default')
app.config.from_pyfile('config.py')
# app.config.from_envvar('APP_CONFIG_FILE')

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
socketio = SocketIO(app)


@app.route('/')
@app.route('/signin')
@app.route('/error')
def index():
    return render_template('index.html')


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    return {'email': user.email}


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.username


@jwt.unauthorized_loader
def my_unauthorized_callback(err_str):
    return render_template('index.html'), 401


@app.route('/register', methods=['POST'])
def register():
    username = request.get_json()['userName'],
    email = request.get_json()['email']

    existing_user1 = User.query.filter_by(username=username).first()
    existing_user2 = User.query.filter_by(email=email).first()

    if existing_user1:
        return jsonify({'user_name': None, 'err': 'username'})
    elif existing_user2:
        return jsonify({'user_name': None, 'err': 'email'})

    password = request.get_json()['password']
    pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    new_user = User(username=username, email=email, password=pw_hash)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user)
    data = jsonify({'user_name': new_user.username,
                    'user_email': new_user.email})
    set_access_cookies(data, access_token)
    return data, 200


@app.route('/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user)
        data = jsonify({'user_name': user.username, 'user_email': user.email})
        set_access_cookies(data, access_token)
        return data, 200
    else:
        return jsonify({'user_name': None})


@app.route('/auth', methods=['GET'])
@jwt_required
def auth():
    res = {
        'user_name': get_jwt_identity(),
        'user_email': get_jwt_claims()['email']
    }
    return jsonify(res), 200


def frontend_room_info(room, deleted=False):
    room_info = {'deleted': deleted, 'id': str(room.id), 'name': room.name, 'created_by': room.created_by,
                 'user1': room.user1_username, 'user2': room.user2_username, 'size': room.game_size}

    if room.password:
        room_info['password'] = True,
    else:
        room_info['password'] = False

    return room_info


def update_rooms(room, deleted=False):
    emit('update players', {'player1': room.user1_username,
                            'player2': room.user2_username}, namespace='/chat', room=str(room.id))

    room_info = frontend_room_info(room, deleted)
    emit('update rooms', room_info, namespace='/chat', broadcast=True)


def delete_user_from_room(room, current_user):
    if room.user1_username == current_user:
        room.user1_username = room.user2_username
        room.user2_username = None
        db.session.commit()
    else:
        room.user2_username = None
        db.session.commit()

    emit('leave message', f'{current_user} has left the room.',
         namespace='/chat', room=str(room.id))
    update_rooms(room)


def user_offline(current_user):
    user = User.query.filter_by(username=current_user).first()
    user.online = False
    db.session.commit()

    emit('user is offline', user.username, namespace='/chat', broadcast=True)

    rooms = Room.query.filter(or_(
        Room.user1_username == current_user, Room.user2_username == current_user)).all()

    for room in rooms:
        delete_user_from_room(room, current_user)


@app.route('/logout', methods=['POST'])
def logout():
    username = request.get_json()['username']
    user_offline(username)
    res = jsonify({})
    unset_jwt_cookies(res)
    return res, 200


@app.route('/list')
@jwt_required
def list():
    return render_template('index.html')


@app.route('/game/<uuid:room_id>')
@jwt_required
def game(room_id):
    return render_template('index.html')


@app.route('/createroom', methods=['POST'])
def create_room():
    name = request.get_json()['roomName'],
    password = request.get_json()['roomPassword']
    user_name = request.get_json()['userName']
    size = request.get_json()['selectedSize']

    pw_hash = password

    if password:
        pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    new_room = Room(name=name, password=pw_hash,
                    created_by=user_name, game_size=size)
    db.session.add(new_room)
    db.session.commit()

    return jsonify({'room_id': str(new_room.id)}), 200


@app.route('/deleteroom', methods=['POST'])
def delete_room():
    room_id = request.get_json()['roomId']
    room = Room.query.filter_by(id=room_id).first()

    db.session.delete(room)
    db.session.commit()

    update_rooms(room, True)
    return jsonify({})


@app.route('/loadrooms')
def load_rooms():
    rooms = Room.query.all()
    res = {'rooms': []}
    for room in rooms:
        room_info = frontend_room_info(room)
        res['rooms'].append(room_info)
    return jsonify(res)


@app.route('/loadusers')
def load_users():
    users_online = User.query.filter_by(online=True).all()
    res = {'user_online': {}}
    for user in users_online:
        res['user_online'][user.username] = {
            'user_name': user.username, 'user_email': user.email}
    return jsonify(res)


@app.route('/check_availability', methods=['POST'])
def check_availability():
    room_id = request.get_json()['roomId']
    room = Room.query.filter_by(id=room_id).first()

    if room:
        if room.user1_username and room.user2_username:
            res = {'count': 2}
        elif room.user1_username or room.user2_username:
            res = {'count': 1}
        else:
            res = {'count': 0}

    return jsonify(res)


@app.route('/pwcheck', methods=['POST'])
def pw_check():
    room_id = request.get_json()['roomId']
    password = request.get_json()['password']

    room = Room.query.filter_by(id=room_id).first()

    if room:
        if bcrypt.check_password_hash(room.password, password):
            return jsonify({'match': True})
        else:
            return jsonify({'match': False})


@socketio.on('connect', namespace='/chat')
@jwt_required
def user_connect():
    user_name = get_jwt_identity()
    user = User.query.filter_by(username=user_name).first()
    user.online = True
    db.session.commit()

    emit('user is online', {'user_name': user.username,
                            'user_email': user.email}, namespace='/chat', broadcast=True)


@socketio.on('disconnect', namespace='/chat')
@jwt_required
def user_disconnect():
    user_name = get_jwt_identity()
    user_offline(user_name)


@socketio.on('join', namespace='/chat')
def on_join(data):
    username = data['username']
    room_id = data['room']
    join_room(room_id)

    room = Room.query.filter_by(id=room_id).first()

    if room.user1_username != username or room.user2_username != username:
        if room.user1_username is None or room.user2_username:
            room.user1_username = username
            db.session.commit()
        else:
            room.user2_username = username
            db.session.commit()

    update_rooms(room)
    emit('join message', f'{username} has entered the room.',
         namespace='/chat', room=room_id)


@socketio.on('leave', namespace='/chat')
def on_leave(data):
    leave_room(data['room'])


@socketio.on('room created', namespace='/chat')
def room_created(data):
    room_id = data['roomId']
    room = Room.query.filter_by(id=room_id).first()

    update_rooms(room)


@socketio.on('chat', namespace='/chat')
def handle_chat(message):
    new_message = message['newMessage']

    if message['roomId']:
        room_id = message['roomId']
        emit('load a chat', new_message, namespace='/chat', room=room_id)
    else:
        emit('load a global chat', new_message,
             namespace='/chat', broadcast=True)


@app.route('/gamestate', methods=['POST'])
def game_state():
    room_id = request.get_json()['roomId']
    room = Room.query.filter_by(id=room_id).first()
    if room.game_id:
        return jsonify({'game_state': True, 'game_id': str(room.game_id)})
    else:
        return jsonify({'game_state': False})


@app.route('/startgame', methods=['POST'])
def start_game():
    room_id = request.get_json()['roomId']
    room = Room.query.filter_by(id=room_id).first()
    grid = make_grid(room.game_size)
    grid_db = json.dumps(grid)
    failed_lines_db = json.dumps({"row": [], "col": [], "diagonal": []})

    new_game = Game(state=grid_db, player1_username=room.user1_username,
                    player2_username=room.user2_username, turn=1, failed_lines=failed_lines_db)

    db.session.add(new_game)
    db.session.commit()

    room.game_id = new_game.id
    db.session.commit()

    emit('game started', str(new_game.id), namespace='/game', room=room_id)

    return jsonify({'game_id': str(new_game.id)})


@app.route('/loadgame', methods=['POST'])
def load_grid():
    game_id = request.get_json()['gameId']
    game = Game.query.filter_by(id=game_id).first()
    grid = json.loads(game.state)
    if game.turn % 2 == 1:
        turn = game.player1_username
    else:
        turn = game.player2_username

    return jsonify({'grid': grid, 'turn': turn})


def game_finished(room, game, result, winner, loser, leave):
    if result == 'draw':
        game.draw = True
        message = 'This game ended in a draw!'
    else:
        game.winner_username = winner
        game.loser_username = loser
        game.draw = False

        if leave:
            message = f'{loser} has left the room, you won!'
        else:
            message = f'{winner} won!'

    emit('game finished', message, namespace='/game', room=str(room.id))

    room.game_id = None
    db.session.commit()


@app.route('/checkgame', methods=['POST'])
def check_game():
    data = request.get_json()
    game = Game.query.filter_by(id=data['gameId']).first()

    # Check if it's this user's turn
    current_player = data['currentUser']
    player1 = game.player1_username
    player2 = game.player2_username
    turn = game.turn

    if (turn % 2 != 1 and current_player == player1) or (turn % 2 != 0 and current_player == player2):
        emit('game finished', f'{current_player} played out of turn! The game will end.',
             namespace='/game', room=data['roomId'])
        return {}

    # Check if an empty space is clicked
    grid = json.loads(game.state)
    x = data['x']
    y = data['y']
    if grid[x][y] != 0:
        emit('game finished', f'{current_player} clicked not an empty space! The game will end.',
             namespace='/game', room=data['roomId'])
        return {}

    # Update the game
    if current_player == player1:
        grid[x][y] = 1
        other_player = player2
    else:
        grid[x][y] = 2
        other_player = player1

    game.state = json.dumps(grid)
    game.turn = turn + 1

    emit('update a game', {'grid': grid, 'turn': other_player},
         namespace='/game', room=data['roomId'])

    # Check if the game ended
    room = Room.query.filter_by(id=data['roomId']).first()
    failed_lines = json.loads(game.failed_lines)
    return_value = check_result(grid, room.game_size, x, y, turn, failed_lines)

    game.failed_lines = json.dumps(return_value['failed_lines'])
    db.session.commit()

    result = return_value['result']
    if result is None:
        return {}
    else:
        game_finished(room, game, result,
                      current_player, other_player, False)
        return {}


@app.route('/leftroom', methods=['POST'])
def left_room():
    data = request.get_json()

    room = Room.query.filter_by(id=data['room']).first()

    if room.game_id:
        game = Game.query.filter_by(id=room.game_id).first()

        if room.user1_username == data['username']:
            winner = room.user2_username
            loser = room.user1_username
        else:
            winner = room.user1_username
            loser = room.user2_username

        game_finished(room, game, True, winner, loser, True)

    delete_user_from_room(room, data['username'])
    return {}


@socketio.on('join', namespace='/game')
def on_join_game(data):
    join_room(data['roomId'])


@socketio.on('leave', namespace='/game')
def on_leave_game(data):
    leave_room(data['roomId'])


if __name__ == '__main__':
    socketio.run(app)

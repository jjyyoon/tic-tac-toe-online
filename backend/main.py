from flask import Flask, render_template, jsonify, request
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt_claims, set_access_cookies, unset_jwt_cookies)
from flask_bcrypt import Bcrypt
from flask_socketio import SocketIO, emit, join_room, leave_room
from sqlalchemy import or_
from uuid import uuid4

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
    password = request.get_json()['password']

    pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    # Add func to prevent a user from using a username that already exists.

    new_user = User(username=username, email=email, password=pw_hash)
    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user)
    res = jsonify({'user_name': new_user.username,
                   'user_email': new_user.email})
    set_access_cookies(res, access_token)
    return res, 200


@app.route('/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user)
        res = jsonify({'user_name': user.username, 'user_email': user.email})
        set_access_cookies(res, access_token)
        return res, 200


@app.route('/auth', methods=['GET'])
@jwt_required
def auth():
    res = {
        'user_name': get_jwt_identity(),
        'user_email': get_jwt_claims()['email']
    }
    return jsonify(res), 200


def user_offline(current_user):
    user = User.query.filter_by(username=current_user).first()
    user.online = False
    db.session.commit()

    emit('user is offline', user.username, namespace='/chat', broadcast=True)


def get_players(room):
    emit('get players', {'player1': room.user1_username,
                         'player2': room.user2_username}, namespace='/chat', room=room.id)


def delete_user_from_room(room, current_user):
    if room.user1_username == current_user:
        room.user1_username = None
        db.session.commit()
    else:
        room.user2_username = None
        db.session.commit()

    emit('leave message', f'{current_user} has left the room.',
         namespace='/chat', room=room.id)
    get_players(room)


@app.route('/logout', methods=['POST'])
def logout():
    user_name = request.get_json()['userName']
    user_offline(user_name)
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
    room_id = uuid4()
    name = request.get_json()['roomName'],
    password = request.get_json()['roomPassword']
    user_name = request.get_json()['userName']

    pw_hash = password

    if password:
        pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    new_room = Room(id=room_id, name=name,
                    password=pw_hash, user1_username=user_name)
    db.session.add(new_room)
    db.session.commit()

    return jsonify({'room_id': room_id}), 200


@app.route('/loadrooms')
def load_rooms():
    rooms = Room.query.all()
    res = {'rooms': []}
    for room in rooms:
        res['rooms'].append({'id': room.id, 'name': room.name, 'password': room.password,
                             'user1': room.user1_username, 'user2': room.user2_username})
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
            res = {'availability': False}
        else:
            res = {'availability': True}

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

    rooms = Room.query.filter(
        or_(Room.user1_username == user_name, Room.user2_username == user_name)).all()

    for room in rooms:
        delete_user_from_room(room, user_name)


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

    get_players(room)
    emit('join message', f'{username} has entered the room.',
         namespace='/chat', room=room_id)


@socketio.on('leave', namespace='/chat')
def on_leave(data):
    username = data['username']
    room_id = data['room']
    leave_room(room_id)

    room = Room.query.filter_by(id=room_id).first()
    delete_user_from_room(room, username)


@socketio.on('chat', namespace='/chat')
def handle_chat(message):
    new_message = message['newMessage']
    room_id = message['room']
    emit('load a chat', new_message, namespace='/chat', room=room_id)


if __name__ == '__main__':
    socketio.run(app)

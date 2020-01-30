from flask import Flask, render_template, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt_claims, set_access_cookies, unset_jwt_cookies)
from flask_socketio import SocketIO
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


@app.route('/logout', methods=['POST'])
def logout():
    res = jsonify({})
    unset_jwt_cookies(res)
    return res, 200


@app.route('/list')
@app.route('/game/<uuid:room_id>')
@jwt_required
def list():
    return render_template('index.html')


@app.route('/createroom', methods=['POST'])
def create_room():
    room_id = uuid4()
    name = request.get_json()['roomName'],
    password = request.get_json()['roomPassword']
    user_name = request.get_json()['userName']

    if password:
        pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')
    else:
        pw_hash = password

    new_room = Room(id=room_id, name=name,
                    password=pw_hash, user1_name=user_name)
    db.session.add(new_room)
    db.session.commit()

    res = jsonify({'room_id': room_id})
    return res, 200


@app.route('/loadrooms')
def load_rooms():
    rooms = Room.query.all()
    res = {'rooms': []}
    for room in rooms:
        res['rooms'].append({'id': room.id, 'name': room.name, 'password': room.password,
                             'user1': room.user1_name, 'user2': room.user2_name})
    return jsonify(res)


@socketio.on('chat')
def handle_chat(message):
    print(message)
    socketio.emit('load a chat', message, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)

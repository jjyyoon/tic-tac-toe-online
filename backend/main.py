from flask import Flask, render_template, jsonify, request
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token, get_jwt_identity, get_jwt_claims, set_access_cookies, unset_jwt_cookies)

from models.database import db
from models.user import User

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config.default')
app.config.from_pyfile('config.py')
# app.config.from_envvar('APP_CONFIG_FILE')

db.init_app(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


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


@app.route('/register', methods=['POST'])
def register():
    username = request.get_json()['userName'],
    email = request.get_json()['email']
    password = request.get_json()['password']

    pw_hash = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    new_user = User(username=username, email=email, password=pw_hash)
    db.session.add(new_user)
    db.session.commit()

    user = User.query.filter_by(email=email).first()

    if user:
        access_token = create_access_token(identity=user)
        res = jsonify({'login': True, 'user_name': user.username, 'user_email': user.email})
        set_access_cookies(res, access_token)
        return res, 200


@app.route('/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity=user)
        res = jsonify({'login': True, 'user_name': user.username, 'user_email': user.email})
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
    res = jsonify({'logout': True})
    unset_jwt_cookies(res)
    return res, 200


@app.route('/list')
@app.route('/game')
@jwt_required
def list():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()

from flask import Flask, render_template
from flask_bcrypt import Bcrypt
from flask_jwt import JWT, jwt_required, current_identity

from models.database import db
from models.user import User

app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config.default')
app.config.from_pyfile('config.py')
# app.config.from_envvar('APP_CONFIG_FILE')

db.init_app(app)
bcrypt = Bcrypt(app)

# Add JWT features!


def authenticate(username, password):
    user = User.query.filter_by(email=username).first().username
    org_pw = User.query.filter_by(email=username).first().password

    if user and bcrypt.check_password_hash(org_pw, password):
        print('here')
        return user


def identity(payload):
    print(payload)
    user_id = payload['identity']
    print(f'user_id:{user_id}')
    return User.query.filter_by(id=user_id).first().id


jwt = JWT(app, authenticate, identity)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/signin')
@jwt_required()
def signin():
    return '%s' % current_identity


@app.route('/list')
def list():
    return render_template('index.html')


if __name__ == "__main__":
    app.run()

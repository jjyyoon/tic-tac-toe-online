from flask import Flask, render_template, request, redirect, url_for
from models.database import db
from models.user import User
from flask_bcrypt import Bcrypt


app = Flask(__name__, instance_relative_config=True)
app.config.from_object('config.default')
app.config.from_pyfile('config.py')
# app.config.from_envvar('APP_CONFIG_FILE')

db.init_app(app)
bcrypt = Bcrypt(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/list')
def list():
    return render_template('index.html')


@app.route('/signin', methods=['POST'])
def createuser():

    username = request.form['userName'],
    email = request.form['email'],
    password = request.form['password']
    pw_hash = bcrypt.generate_password_hash(password, 10)

    new_user = User(username=username, email=email, password=pw_hash)

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for("list"))


if __name__ == "__main__":
    app.run()

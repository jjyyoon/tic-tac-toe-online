from flask import Flask, render_template, request, redirect, url_for
from models.database import db
from models.user import User
from configuration import postgresql_uri

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = postgresql_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/list')
def list():
    return render_template('index.html')


@app.route('/signin', methods=['POST'])
def createuser():

    new_user = User(username=request.form['userName'],
                    email=request.form['email'],
                    password=request.form['password'])

    db.session.add(new_user)
    db.session.commit()

    return redirect(url_for("list"))


if __name__ == "__main__":
    app.run()

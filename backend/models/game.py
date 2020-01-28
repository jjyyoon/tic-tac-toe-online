from .database import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(80), db.ForeignKey('user.username'))
    player2 = db.Column(db.String(80), db.ForeignKey('user.username'))
    winner = db.Column(db.String(80), db.ForeignKey('user.username'))
    loser = db.Column(db.String(80), db.ForeignKey('user.username'))

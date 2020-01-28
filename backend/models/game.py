from .database import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1 = db.Column(db.String(80), nullable=False)
    player2 = db.Column(db.String(80), nullable=False)
    winner = db.Column(db.String(80), nullable=False)
    loser = db.Column(db.String(80), nullable=False)

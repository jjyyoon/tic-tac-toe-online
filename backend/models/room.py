from .database import db


class Room(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(125), nullable=False)
    player1 = db.Column(db.String(80), nullable=False)
    player2 = db.Column(db.String(80), nullable=False)

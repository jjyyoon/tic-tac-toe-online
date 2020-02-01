from .database import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    player2_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    winner_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    loser_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    player1 = db.relationship('User', foreign_keys=[player1_username])
    player2 = db.relationship('User', foreign_keys=[player2_username])
    winner = db.relationship('User', foreign_keys=[winner_username])
    loser = db.relationship('User', foreign_keys=[loser_username])

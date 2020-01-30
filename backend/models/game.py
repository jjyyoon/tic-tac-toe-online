from .database import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player1_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    player2_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    winner_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    loser_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    player1 = db.relationship('User', foreign_keys=[player1_name])
    player2 = db.relationship('User', foreign_keys=[player2_name])
    winner = db.relationship('User', foreign_keys=[winner_name])
    loser = db.relationship('User', foreign_keys=[loser_name])

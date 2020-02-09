from .database import db


class Game(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    state = db.Column(db.Text, nullable=False)
    player1_username = db.Column(
        db.String(80), db.ForeignKey('user.username'), nullable=False)
    player2_username = db.Column(
        db.String(80), db.ForeignKey('user.username'), nullable=False)
    turn = db.Column(db.Integer, nullable=False)
    winner_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    loser_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    player1 = db.relationship('User', foreign_keys=[player1_username])
    player2 = db.relationship('User', foreign_keys=[player2_username])
    winner = db.relationship('User', foreign_keys=[winner_username])
    loser = db.relationship('User', foreign_keys=[loser_username])

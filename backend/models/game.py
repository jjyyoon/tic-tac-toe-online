from .database import db
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class Game(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4())
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

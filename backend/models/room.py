from .database import db
from datetime import datetime


class Room(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(60))
    user1_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    user2_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    user1 = db.relationship('User', foreign_keys=[user1_username])
    user2 = db.relationship('User', foreign_keys=[user2_username])
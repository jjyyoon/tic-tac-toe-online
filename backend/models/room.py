from .database import db


class Room(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(125))
    user1_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    user2_name = db.Column(db.String(80), db.ForeignKey('user.username'))
    user1 = db.relationship('User', foreign_keys=[user1_name])
    user2 = db.relationship('User', foreign_keys=[user2_name])

from .database import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from uuid import uuid4


class Room(db.Model):
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid4())
    name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(60))
    created_by = db.Column(db.String(80), db.ForeignKey(
        'user.username'), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    user1_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    user2_username = db.Column(db.String(80), db.ForeignKey('user.username'))
    creator = db.relationship('User', foreign_keys=[created_by])
    user1 = db.relationship('User', foreign_keys=[user1_username])
    user2 = db.relationship('User', foreign_keys=[user2_username])

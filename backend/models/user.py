from .database import db
from datetime import datetime


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(
        db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    online = db.Column(db.Boolean(), default=False)

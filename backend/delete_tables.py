from main import app
from models.database import db

with app.app_context():
    db.drop_all()

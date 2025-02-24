from app import db
from datetime import datetime

class Store(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Store belongs to an Admin

    admin = db.relationship('User', backref='stores')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'admin_id': self.admin_id,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

from app import db
from datetime import datetime

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    buying_price = db.Column(db.Float, nullable=False)
    selling_price = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'), nullable=False)  # Product belongs to a Store

    store = db.relationship('Store', backref='products')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'buying_price': self.buying_price,
            'selling_price': self.selling_price,
            'store_id': self.store_id,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

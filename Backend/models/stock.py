from app import db
from datetime import datetime

class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity_received = db.Column(db.Integer, nullable=False)
    quantity_in_stock = db.Column(db.Integer, nullable=False)
    quantity_damaged = db.Column(db.Integer, default=0)
    payment_status = db.Column(db.String(50), default="unpaid")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    product = db.relationship('Product', backref='stock')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'product_name': self.product.name,
            'quantity_received': self.quantity_received,
            'quantity_in_stock': self.quantity_in_stock,
            'quantity_damaged': self.quantity_damaged,
            'payment_status': self.payment_status,
            'created_at': self.created_at.strftime("%Y-%m-%d %H:%M:%S")
        }

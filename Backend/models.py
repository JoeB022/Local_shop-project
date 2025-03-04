# model/__init__.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import enum

db = SQLAlchemy()

class Role(enum.Enum):
    merchant = 'merchant'
    admin = 'admin'
    clerk = 'clerk'

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    role = db.Column(db.Enum(Role), nullable=False)
    stores = db.relationship('Store', backref='merchant')
    requests = db.relationship('SupplyRequest', backref='clerk')
    clerk_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    is_clerk = db.Column(db.Boolean, default=False)

class Store(db.Model):
    __tablename__ = 'stores'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.Text, nullable=False)
    merchant_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    products = db.relationship('Product', backref='store')
    supply_requests = db.relationship('SupplyRequest', backref='store')

class Product(db.Model):
    __tablename__ = 'products'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    buying_price = db.Column(db.Numeric(10, 2), nullable=False)
    selling_price = db.Column(db.Numeric(10, 2), nullable=False)
    store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))
    stock = db.relationship('Stock', backref='product', uselist=False)
    supply_requests = db.relationship('SupplyRequest', backref='product')

class Stock(db.Model):
    __tablename__ = 'stocks'
    
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    quantity = db.Column(db.Integer, nullable=False)
    quantity_spoilt = db.Column(db.Integer, nullable=False, default=0)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

class SupplyRequest(db.Model):
    __tablename__ = 'supply_requests'
    
    id = db.Column(db.Integer, primary_key=True)
    store_id = db.Column(db.Integer, db.ForeignKey('stores.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    requested_quantity = db.Column(db.Integer, nullable=False)
    received_quantity = db.Column(db.Integer, nullable=True)
    payment_status = db.Column(db.String(50), nullable=False, default='Pending')
    status = db.Column(db.String(50), nullable=False, default='Pending')
    requested_at = db.Column(db.DateTime, default=datetime.utcnow)
    clerk_id = db.Column(db.Integer, db.ForeignKey('users.id'))
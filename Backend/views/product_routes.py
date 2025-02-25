from flask import Blueprint, request, jsonify
from app import db
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.auth_helper import role_required

product_bp = Blueprint('product', __name__)

# Add a product (Admin only)
@product_bp.route('/add', methods=['POST'])
@jwt_required()
@role_required(["admin"])
def add_product():
    data = request.get_json()
    name = data.get('name')
    buying_price = data.get('buying_price')
    selling_price = data.get('selling_price')
    store_id = data.get('store_id')

    if not all([name, buying_price, selling_price, store_id]):
        return jsonify({'message': 'Missing required fields'}), 400

    new_product = Product(name=name, buying_price=buying_price, selling_price=selling_price, store_id=store_id)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully'}), 201

# Get all products
@product_bp.route('/get_products', methods=['GET'])
@jwt_required()
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

# Get product by ID
@product_bp.route('/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    return jsonify(product.to_dict()), 200

# Delete a product (Admin only)
@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
@role_required(["admin"])
def delete_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

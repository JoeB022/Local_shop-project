from flask import Blueprint, request, jsonify
from app import db
from models.product import Product
from flask_jwt_extended import jwt_required, get_jwt_identity

product_bp = Blueprint('product', __name__)

# Add a product (Admin only)
@product_bp.route('/add', methods=['POST'])
@jwt_required()
def add_product():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admins only!'}), 403

    data = request.get_json()
    name = data.get('name')
    buying_price = data.get('buying_price')
    selling_price = data.get('selling_price')
    store_id = data.get('store_id')

    new_product = Product(name=name, buying_price=buying_price, selling_price=selling_price, store_id=store_id)
    db.session.add(new_product)
    db.session.commit()

    return jsonify({'message': 'Product added successfully', 'product': new_product.to_dict()}), 201

# Get all products
@product_bp.route('/', methods=['GET'])
@jwt_required()
def get_products():
    products = Product.query.all()
    return jsonify([product.to_dict() for product in products]), 200

# Get product by ID
@product_bp.route('/<int:product_id>', methods=['GET'])
@jwt_required()
def get_product(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    return jsonify(product.to_dict()), 200

# Delete a product (Admin only)
@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admins only!'}), 403

    product = Product.query.get(product_id)
    if not product:
        return jsonify({'message': 'Product not found'}), 404

    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

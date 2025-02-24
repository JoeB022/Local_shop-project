from flask import Blueprint, request, jsonify
from app import db
from models.stock import Stock
from flask_jwt_extended import jwt_required, get_jwt_identity

stock_bp = Blueprint('stock', __name__)
# Add stock entry (Clerk)
@stock_bp.route('/add', methods=['POST'])
@jwt_required()
def add_stock():
    current_user = get_jwt_identity()
    if current_user['role'] != 'clerk':
        return jsonify({'message': 'Clerks only!'}), 403

    data = request.get_json()
    product_id = data.get('product_id')
    quantity_received = data.get('quantity_received')

    new_stock = Stock(
        product_id=product_id,
        quantity_received=quantity_received,
        quantity_in_stock=quantity_received
    )
    db.session.add(new_stock)
    db.session.commit()

    return jsonify({'message': 'Stock added successfully', 'stock': new_stock.to_dict()}), 201

# Get all stock records
@stock_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_stock():
    stock = Stock.query.all()
    return jsonify([item.to_dict() for item in stock]), 200

# Update stock (Admin only)
@stock_bp.route('/update/<int:stock_id>', methods=['PUT'])
@jwt_required()
def update_stock(stock_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admins only!'}), 403

    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({'message': 'Stock not found'}), 404

    data = request.get_json()
    stock.quantity_in_stock = data.get('quantity_in_stock', stock.quantity_in_stock)
    stock.quantity_damaged = data.get('quantity_damaged', stock.quantity_damaged)
    stock.payment_status = data.get('payment_status', stock.payment_status)

    db.session.commit()
    return jsonify({'message': 'Stock updated successfully', 'stock': stock.to_dict()}), 200

# Request more supply (Clerk)
@stock_bp.route('/request/<int:stock_id>', methods=['POST'])
@jwt_required()
def request_stock(stock_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'clerk':
        return jsonify({'message': 'Clerks only!'}), 403

    stock = Stock.query.get(stock_id)
    if not stock:
        return jsonify({'message': 'Stock not found'}), 404

    return jsonify({'message': 'Request sent to store admin'}), 200

from flask import Blueprint, request, jsonify
from app import db
from models.store import Store
from flask_jwt_extended import jwt_required, get_jwt_identity

store_bp = Blueprint('store', __name__)

# Create a new store (Admin only)
@store_bp.route('/create', methods=['POST'])
@jwt_required()
def create_store():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admins only!'}), 403

    data = request.get_json()
    name = data.get('name')
    location = data.get('location')

    new_store = Store(name=name, location=location, admin_id=current_user['id'])
    db.session.add(new_store)
    db.session.commit()

    return jsonify({'message': 'Store created successfully', 'store': new_store.to_dict()}), 201

# Get all stores
@store_bp.route('/', methods=['GET'])
@jwt_required()
def get_stores():
    stores = Store.query.all()
    return jsonify([store.to_dict() for store in stores]), 200

# Get store by ID
@store_bp.route('/<int:store_id>', methods=['GET'])
@jwt_required()
def get_store(store_id):
    store = Store.query.get(store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    return jsonify(store.to_dict()), 200

# Delete a store (Admin only)
@store_bp.route('/<int:store_id>', methods=['DELETE'])
@jwt_required()
def delete_store(store_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Admins only!'}), 403

    store = Store.query.get(store_id)
    if not store:
        return jsonify({'message': 'Store not found'}), 404

    db.session.delete(store)
    db.session.commit()
    return jsonify({'message': 'Store deleted successfully'}), 200

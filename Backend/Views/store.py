from flask import Blueprint, request, jsonify
from models import Store, db

store_bp = Blueprint('store', __name__, url_prefix='/stores')

@store_bp.route('/', methods=['GET'])
def get_stores():
    stores = Store.query.all()
    return jsonify([{'id': store.id, 'name': store.name, 'address': store.address} for store in stores])

@store_bp.route('/<int:store_id>', methods=['GET'])
def get_store(store_id):
    store = Store.query.get_or_404(store_id)
    return jsonify({'id': store.id, 'name': store.name, 'address': store.address})

@store_bp.route('/', methods=['POST'])
def create_store():
    data = request.get_json()
    new_store = Store(name=data['name'], address=data['address'], merchant_id=data['merchant_id'])
    db.session.add(new_store)
    db.session.commit()
    return jsonify({'id': new_store.id, 'name': new_store.name, 'address': new_store.address}), 201

@store_bp.route('/<int:store_id>', methods=['PUT'])
def update_store(store_id):
    store = Store.query.get_or_404(store_id)
    data = request.get_json()
    store.name = data.get('name', store.name)
    store.address = data.get('address', store.address)
    db.session.commit()
    return jsonify({'id': store.id, 'name': store.name, 'address': store.address})

@store_bp.route('/<int:store_id>', methods=['DELETE'])
def delete_store(store_id):
    store = Store.query.get_or_404(store_id)
    db.session.delete(store)
    db.session.commit()
    return '', 204
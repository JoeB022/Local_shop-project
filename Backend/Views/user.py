from flask import Blueprint, request, jsonify
from models import User, db, Role

user_bp = Blueprint('user', __name__, url_prefix='/users')

@user_bp.route('/', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{
        'id': user.id,
        'username': user.username,
        'role': user.role.value,
        'is_clerk': user.is_clerk
    } for user in users])

@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify({
        'id': user.id,
        'username': user.username,
        'role': user.role.value,
        'is_clerk': user.is_clerk
    })

@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    role = Role(data['role'])  # Convert string to Role enum
    new_user = User(
        username=data['username'],
        password_hash=data['password_hash'],  # In a real app, hash the password
        role=role,
        is_clerk=data.get('is_clerk', False)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'id': new_user.id,
        'username': new_user.username,
        'role': new_user.role.value,
        'is_clerk': new_user.is_clerk
    }), 201

@user_bp.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    user.username = data.get('username', user.username)
    if 'role' in data:
        user.role = Role(data['role'])  # Convert string to Role enum
    user.is_clerk = data.get('is_clerk', user.is_clerk)
    db.session.commit()
    return jsonify({
        'id': user.id,
        'username': user.username,
        'role': user.role.value,
        'is_clerk': user.is_clerk
    })

@user_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return '', 204
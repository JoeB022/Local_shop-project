from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, jwt
from models.user import User
from flask_jwt_extended import (
    create_access_token, 
    jwt_required, 
    get_jwt_identity, 
    get_jwt, 
    unset_jwt_cookies
)
from datetime import timedelta

auth_bp = Blueprint('auth', __name__)

# Register Admin
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'admin')  # Default to admin

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(
            identity={'id': user.id, 'role': user.role}, 
            expires_delta=timedelta(hours=24)  # Token expires in 24 hours
        )
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': user.to_dict()
        }), 200
    
    return jsonify({'message': 'Invalid email or password'}), 401

# Get current user
@auth_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()
    return jsonify({
        'message': 'User retrieved successfully',
        'user': current_user
    }), 200

# Logout
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200
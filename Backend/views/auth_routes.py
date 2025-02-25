from flask import Blueprint, request, jsonify, url_for, redirect
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, jwt
from models.user import User
from flask_jwt_extended import (
    create_access_token, 
    jwt_required, 
    get_jwt_identity, 
    unset_jwt_cookies
)
from datetime import timedelta
from utils.auth_helper import role_required
from utils.email_helper import send_email
import random
import string

auth_bp = Blueprint('auth', __name__)

# Store reset tokens (temporary storage)
password_reset_tokens = {}

# Generate a random 6-digit reset code
def generate_reset_code():
    return ''.join(random.choices(string.digits, k=6))

# Request Password Reset (Send Email)
@auth_bp.route('/password_reset_request', methods=['POST'])
def password_reset_request():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    reset_code = generate_reset_code()
    password_reset_tokens[email] = reset_code  # Store code in memory

    email_body = f"Your password reset code is: {reset_code}\nUse this code to reset your password."
    if send_email('Password Reset Request', email, email_body):
        return jsonify({'message': 'Password reset code sent to your email'}), 200
    else:
        return jsonify({'message': 'Failed to send email'}), 500

# Verify Reset Code and Update Password
@auth_bp.route('/password_reset', methods=['POST'])
def password_reset():
    data = request.get_json()
    email = data.get('email')
    reset_code = data.get('reset_code')
    new_password = data.get('new_password')

    # Validate reset code
    if email not in password_reset_tokens or password_reset_tokens[email] != reset_code:
        return jsonify({'message': 'Invalid or expired reset code'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Update password
    user.password = generate_password_hash(new_password)
    db.session.commit()

    # Remove the used reset code
    del password_reset_tokens[email]

    return jsonify({'message': 'Password reset successful'}), 200

# Register Clerk (Only merchants can add clerks)
@auth_bp.route('/register_clerk', methods=['POST'])
@jwt_required()
@role_required(["merchant"])
def register_clerk():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role="clerk")
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Clerk registered successfully'}), 201

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

# Get User Info
@auth_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user = get_jwt_identity()  # Get user identity from JWT
    user = User.query.get(current_user["id"])  # Fetch user details

    if not user:
        return jsonify({'message': 'User not found'}), 404

    return jsonify({
        'message': 'User retrieved successfully',
        'user': user.to_dict()
    }), 200

# Logout
@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    return response, 200

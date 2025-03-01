from flask import jsonify
from flask_jwt_extended import get_jwt_identity

def role_required(allowed_roles):
    """
    Decorator function to restrict access based on user roles.
    Usage:
        @jwt_required()
        @role_required(["admin", "merchant"])
    """
    def wrapper(func):
        def decorated_function(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] not in allowed_roles:
                return jsonify({'message': 'Access denied! Unauthorized role'}), 403
            return func(*args, **kwargs)
        return decorated_function
    return wrapper

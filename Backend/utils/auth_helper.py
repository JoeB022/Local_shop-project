from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity

def role_required(roles):
    def decorator(fn):
        @wraps(fn)  # Preserves the original function name
        def decorated_function(*args, **kwargs):
            current_user = get_jwt_identity()
            if current_user['role'] not in roles:
                return jsonify({'message': 'Unauthorized'}), 403
            return fn(*args, **kwargs)
        return decorated_function
    return decorator

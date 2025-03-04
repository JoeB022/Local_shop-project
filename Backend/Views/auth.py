from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models import User, db
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from flask_mail import Mail, Message
import logging
from app import mail

# Initialize serializer for generating tokens
serializer = URLSafeTimedSerializer("SECRET_KEY")  # Use your app's secret key

# Create the auth_bp blueprint
auth_bp = Blueprint('auth', __name__)

# Global variable to store the mail instance
mail_instance = None

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to set the mail instance
def set_mail_instance(mail: Mail):
    global mail_instance
    mail_instance = mail

# Login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    # Generate JWT token for the user
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone_number": user.phone_number,
            "profile_picture": user.profile_picture,
            "is_admin": user.is_admin,
            "created_at": user.created_at.isoformat() if user.created_at else None
        }
    }), 200

# Request Password Reset Token
@auth_bp.route('/request-password-reset', methods=['POST'])
def request_password_reset():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "User with this email does not exist"}), 404

    # Generate a password reset token
    token = serializer.dumps(email, salt="password-reset-salt")
    reset_url = f"http://localhost:5000/reset-password/{token}"

    # Send the password reset email
    msg = Message(
        subject="Password Reset Request",
        recipients=[email],
        body=f"Click the link to reset your password: {reset_url}"
    )

    if mail_instance:
        try:
            mail_instance.send(msg)  # Use the globally stored mail instance
            logger.info(f"Password reset email sent to {email}")
            return jsonify({"message": "Password reset email sent successfully"}), 200
        except Exception as e:
            logger.error(f"Error sending email to {email}: {str(e)}")
            return jsonify({"message": "Error sending email", "error": str(e)}), 500
    else:
        logger.error("Mail instance not initialized")
        return jsonify({"message": "Mail service not configured"}), 500
    
@auth_bp.route('/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Generate a password reset token
    token = serializer.dumps(email, salt="password-reset")

    # Create the reset link pointing to the frontend
    reset_link = f"http://localhost:5173/reset-password/{token}"

    # Send the email with the reset link
    msg = Message("Password Reset Request", sender="joebrian998@gmail.com", recipients=[email])
    msg.html = f"Click <a href='{reset_link}'>here</a> to reset your password."
    mail.send(msg)

    return jsonify({"message": "Password reset email sent"}), 200

# Reset Password

@auth_bp.route('/auth/reset-password/<token>', methods=['POST'])
def reset_password(token):
    data = request.get_json()
    new_password = data.get('password')

    if not new_password:
        return jsonify({"error": "Password is required"}), 400

    try:
        # Verify the token and get the email
        email = serializer.loads(token, salt="password-reset", max_age=1800)  # 30 min expiry
    except:
        return jsonify({"error": "Invalid or expired token"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update the user's password
    user.password_hash = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password reset successful"}), 200
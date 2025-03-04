from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from flask_cors import CORS
from werkzeug.security import check_password_hash
import os
import secrets
from datetime import timedelta

# Import models and database
from models import db, User, Store, Product, Stock, SupplyRequest

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests


# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///localshop.db' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize database & migrations
db.init_app(app)
migrate = Migrate(app, db)  # 

# JWT configuration
app.config["JWT_SECRET_KEY"] = secrets.token_hex(32)  # Secure JWT secret key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)  # Token expiration time
jwt = JWTManager(app)  # Initialize JWTManager

# Secret key for session management
app.secret_key = secrets.token_hex(16)

# Authentication Route
# @app.route('/login', methods=['POST'])
# def login():
#     """Login route for authentication."""
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     # Check if user exists in Admin, Clerk, or Merchant tables
#     user = Admin.query.filter_by(email=email).first() or \
#            Clerk.query.filter_by(email=email).first() or \
#            Merchant.query.filter_by(email=email).first()

#     if user and check_password_hash(user.password, password):
#         access_token = create_access_token(
#             identity={"id": user.id, "email": user.email, "role": user.__class__.__name__}
#         )
#         return jsonify({"message": "Login successful", "token": access_token})
    
#     return jsonify({"message": "Invalid credentials"}), 401

# Import and register blueprints if they exist
from Views.user import user_bp
from Views.supply_request import supply_request_bp
from Views.store import store_bp
from Views.product import product_bp 
from Views.stock import stock_bp

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(store_bp, url_prefix='/store')
app.register_blueprint(product_bp, url_prefix='/product')
app.register_blueprint(supply_request_bp, url_prefix='/supply_request')
app.register_blueprint(stock_bp, url_prefix='/stock')

# ✅ Run Flask application
if __name__ == '__main__':
    with app.app_context():  # Ensure database tables are created
        db.create_all()
    app.run(debug=True)

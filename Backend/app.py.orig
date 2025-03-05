from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail, Message
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
migrate = Migrate(app, db)

# JWT configuration
app.config["JWT_SECRET_KEY"] = secrets.token_hex(32)  # Secure JWT secret key
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)  # Token expiration time
jwt = JWTManager(app)  # Initialize JWTManager

# Secret key for session management
app.secret_key = secrets.token_hex(16)

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Use Gmail SMTP server
app.config['MAIL_PORT'] = 587  # TLS port
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.getenv('joebrian998@gmail.com')  # Secure email credentials
app.config['MAIL_PASSWORD'] = os.getenv('vvmo sjvt pkgi kvfc')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('joebrian998@gmail.com')

# Initialize Flask-Mail
mail = Mail(app)

def send_email(subject, recipients, body):
    """Function to send emails using Flask-Mail"""
    if not mail:
        return jsonify({'error': 'Mail service not configured'}), 500
    try:
        msg = Message(subject, recipients=recipients, body=body)
        mail.send(msg)
        return True
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/send-email', methods=['POST'])
def send_mail_route():
    data = request.get_json()
    recipient = data.get('email')

    if not recipient:
        return jsonify({'error': 'Email is required'}), 400

    send_email(
        subject="Welcome to LocalShop",
        recipients=[recipient],
        body="Thank you for signing up. We are excited to have you!"
    )

    return jsonify({'message': 'Email sent successfully'}), 200

# Import and register blueprints
from Views.user import user_bp
from Views.supply_request import supply_request_bp
from Views.store import store_bp
from Views.product import product_bp
from Views.stock import stock_bp
from Views.auth import auth_bp

app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(store_bp, url_prefix='/store')
app.register_blueprint(product_bp, url_prefix='/product')
app.register_blueprint(supply_request_bp, url_prefix='/supply_request')
app.register_blueprint(stock_bp, url_prefix='/stock')
app.register_blueprint(auth_bp)

# ✅ Run Flask application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)




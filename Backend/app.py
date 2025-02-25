from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from flask_dance.contrib.google import make_google_blueprint
from flask_dance.contrib.github import make_github_blueprint
from config import Config

# Extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
mail = Mail()

# Google OAuth Blueprint
google_bp = make_google_blueprint(
    client_id=Config.GOOGLE_CLIENT_ID,
    client_secret=Config.GOOGLE_CLIENT_SECRET,
    redirect_to="auth.google_login"
)

# GitHub OAuth Blueprint
github_bp = make_github_blueprint(
    client_id=Config.GITHUB_CLIENT_ID,
    client_secret=Config.GITHUB_CLIENT_SECRET,
    redirect_to="auth.github_login"
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Explicitly setting JWT_SECRET_KEY
    app.config['JWT_SECRET_KEY'] = 'your_secret_key'

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    mail.init_app(app)

    # Register OAuth Blueprints
    app.register_blueprint(google_bp, url_prefix="/auth/google")
    app.register_blueprint(github_bp, url_prefix="/auth/github")

    # Import and register blueprints (routes)
    from views.auth_routes import auth_bp
    from views.store_routes import store_bp
    from views.product_routes import product_bp
    from views.stock_routes import stock_bp
    from views.merchant_routes import merchant_bp
    from views.admin_routes import admin_bp
    from views.clerks_routes import clerk_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(store_bp, url_prefix='/store')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(stock_bp, url_prefix='/stock')
    app.register_blueprint(merchant_bp, url_prefix='/merchants')
    app.register_blueprint(admin_bp, url_prefix='/admins')
    app.register_blueprint(clerk_bp, url_prefix='/clerks')

    # Handle JWT errors globally
    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify({'message': 'Missing or invalid token'}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'message': 'Invalid token'}), 401

    return app

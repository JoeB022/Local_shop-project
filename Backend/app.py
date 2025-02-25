from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from config import Config

# Extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Explicitly setting JWT_SECRET_KEY
    app.config['JWT_SECRET_KEY'] = 'your_secret_key'

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)  # Initialize JWT
    cors.init_app(app)
    mail.init_app(app)

    # Import and register blueprints (routes)
    from views.auth_routes import auth_bp
    from views.store_routes import store_bp
    from views.product_routes import product_bp
    from views.stock_routes import stock_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(store_bp, url_prefix='/store')
    app.register_blueprint(product_bp, url_prefix='/product')
    app.register_blueprint(stock_bp, url_prefix='/stock')

    # Handle JWT errors globally
    @jwt.unauthorized_loader
    def unauthorized_callback(error):
        return jsonify({'message': 'Missing or invalid token'}), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):
        return jsonify({'message': 'Invalid token'}), 401

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

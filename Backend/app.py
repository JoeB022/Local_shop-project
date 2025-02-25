# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_migrate import Migrate
# from flask_jwt_extended import JWTManager
# from flask_cors import CORS
# from flask_mail import Mail
# from config import Config

# # Extensions
# db = SQLAlchemy()
# migrate = Migrate()
# jwt = JWTManager()
# cors = CORS()
# mail = Mail()

# def create_app():
#     app = Flask(__name__)
#     app.config.from_object(Config)

#     # Initialize extensions
#     db.init_app(app)
#     migrate.init_app(app, db)
#     jwt.init_app(app)
#     cors.init_app(app)
#     mail.init_app(app)

#     # Import and register blueprints (routes)
#     from views.auth_routes import auth_bp
#     from views.store_routes import store_bp
#     from views.product_routes import product_bp
#     from views.stock_routes import stock_bp

#     app.register_blueprint(auth_bp, url_prefix='/auth')
#     app.register_blueprint(store_bp, url_prefix='/store')
#     app.register_blueprint(product_bp, url_prefix='/product')
#     app.register_blueprint(stock_bp, url_prefix='/stock')

#     return app



from flask import Flask
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

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for now
    mail.init_app(app)

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

    return app


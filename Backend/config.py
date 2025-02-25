import os

class Config:
    # Secret Keys
    SECRET_KEY = os.environ.get('SECRET_KEY', 'fallback_secret_key')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'fallback_jwt_secret_key')

    # Database Configuration (Use PostgreSQL in production, SQLite locally)
    if os.environ.get('FLASK_ENV') == 'production':
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'postgresql://user:password@localhost:5432/localshop')
    else:
        SQLALCHEMY_DATABASE_URI = 'sqlite:///localshop.db'

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Flask-Mail Configuration
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.environ.get('MAIL_PORT', 587))
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'True') == 'True'
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', '')
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER', MAIL_USERNAME)

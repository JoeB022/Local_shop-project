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
    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwtsecretkey')
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours (in seconds)
    JWT_REFRESH_TOKEN_EXPIRES = 2592000  # 30 days (in seconds)

    # Flask-Mail Configuration (For Sending Tokenized Links)
    MAIL_SERVER = 'joebrian022@gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your_email@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your_email_password')
    MAIL_DEFAULT_SENDER = os.getenv('MAIL_DEFAULT_SENDER', 'your_email@gmail.com')

      # Google OAuth
    GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID', 'your_google_client_id')
    GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET', 'your_google_client_secret')

    # GitHub OAuth
    GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID', 'your_github_client_id')
    GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET', 'your_github_client_secret')
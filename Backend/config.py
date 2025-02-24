import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretkey')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///localshop.db'  # Change to PostgreSQL in production
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # JWT Configuration
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'jwtsecretkey')

    # Flask-Mail Configuration (For Sending Tokenized Links)
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.getenv('MAIL_USERNAME', 'your_email@gmail.com')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', 'your_email_password')

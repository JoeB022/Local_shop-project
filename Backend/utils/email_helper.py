from flask_mail import Message
from app import mail

def send_email(subject, recipient, body):
    """ Helper function to send an email. """
    try:
        msg = Message(subject, recipients=[recipient])
        msg.body = body
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

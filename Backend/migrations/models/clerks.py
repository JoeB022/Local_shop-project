from app import db

class Clerks(db.Model):
    __tablename__ = 'clerks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email =db.column(db.string(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)

def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'email': self.email,
        'password': self.password
        }  
from flask import Blueprint, request, jsonify
from models.clerks import Clerk
from app import db, mail
from flask_mail import Message

clerk_bp = Blueprint("clerk_bp", __name__, url_prefix="/clerks")

# Get all clerks with pagination
@clerk_bp.route("/", methods=["GET"])
def get_clerks():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Clerk.query.paginate(page=page, per_page=per_page, error_out=False)

    if not pagination.items:
        return jsonify({"message": "No clerks found"}), 404

    return jsonify({
        'clerks': [clerk.to_dict() for clerk in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200

# Create a clerk and send an email notification
@clerk_bp.route("/", methods=["POST"])
def create_clerk():
    data = request.get_json()
    
    if not data or not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and email are required"}), 400

    new_clerk = Clerk(name=data["name"], email=data["email"])
    db.session.add(new_clerk)
    db.session.commit()

    # Send confirmation email
    try:
        msg = Message(
            subject="Welcome to LocalShop",
            sender="your-email@example.com",
            recipients=[new_clerk.email],
            body=f"Hello {new_clerk.name},\n\nYour clerk account has been successfully created!"
        )
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

    return jsonify(new_clerk.to_dict()), 201

# Delete a clerk
@clerk_bp.route("/<int:id>", methods=["DELETE"])
def delete_clerk(id):
    clerk = Clerk.query.get_or_404(id)
    db.session.delete(clerk)
    db.session.commit()
    return jsonify({"message": "Clerk deleted"}), 200

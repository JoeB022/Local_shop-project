from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from models.clerks import Clerk
from models.admin import Admin
from app import db, mail

clerk_bp = Blueprint("clerk_bp", __name__, url_prefix="/clerks")

# Get all clerks with pagination
@clerk_bp.route("/", methods=["GET"])
@jwt_required()
def get_clerks():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Clerk.query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'clerks': [clerk.to_dict() for clerk in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200

# Admin can create a clerk
@clerk_bp.route("/", methods=["POST"])
@jwt_required()
def create_clerk():
    current_user = get_jwt_identity()
    admin = Admin.query.filter_by(id=current_user["id"]).first()

    if not admin:
        return jsonify({"error": "Only an admin can create a clerk"}), 403

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
            sender="noreply@localshop.com",
            recipients=[new_clerk.email],
            body=f"Hello {new_clerk.name},\n\nYour clerk account has been successfully created!\n\nBest,\nLocalShop Team"
        )
        mail.send(msg)
    except Exception as e:
        return jsonify({"message": "Clerk created but email could not be sent", "error": str(e)}), 201

    return jsonify({"message": "Clerk created successfully!", "clerk": new_clerk.to_dict()}), 201

# Admin can delete a clerk
@clerk_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_clerk(id):
    current_user = get_jwt_identity()
    admin = Admin.query.filter_by(id=current_user["id"]).first()

    if not admin:
        return jsonify({"error": "Only an admin can delete a clerk"}), 403

    clerk = Clerk.query.get_or_404(id)
    db.session.delete(clerk)
    db.session.commit()
    
    return jsonify({"message": "Clerk deleted successfully"}), 200

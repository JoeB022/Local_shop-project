from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_mail import Message
from models.admin import Admin
from models.merchant import Merchant
from app import db, mail

admin_bp = Blueprint("admin_bp", __name__, url_prefix="/admins")

# Get all admins with pagination
@admin_bp.route("/", methods=["GET"])
@jwt_required()
def get_admins():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Admin.query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'admins': [admin.to_dict() for admin in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200

# Merchant can create an admin
@admin_bp.route("/", methods=["POST"])
@jwt_required()
def create_admin():
    current_user = get_jwt_identity()
    merchant = Merchant.query.filter_by(id=current_user["id"]).first()

    if not merchant:
        return jsonify({"error": "Only a merchant can create an admin"}), 403

    data = request.get_json()
    if not data or not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and email are required"}), 400

    new_admin = Admin(name=data["name"], email=data["email"])
    db.session.add(new_admin)
    db.session.commit()

    # Send confirmation email
    try:
        msg = Message(
            subject="Admin Account Created - LocalShop",
            sender="noreply@localshop.com",
            recipients=[new_admin.email],
            body=f"Hello {new_admin.name},\n\nYour admin account has been successfully created!\n\nBest,\nLocalShop Team"
        )
        mail.send(msg)
    except Exception as e:
        return jsonify({"message": "Admin created but email could not be sent", "error": str(e)}), 201

    return jsonify({"message": "Admin created successfully!", "admin": new_admin.to_dict()}), 201

# Merchant can delete an admin
@admin_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_admin(id):
    current_user = get_jwt_identity()
    merchant = Merchant.query.filter_by(id=current_user["id"]).first()

    if not merchant:
        return jsonify({"error": "Only a merchant can delete an admin"}), 403

    admin = Admin.query.get_or_404(id)
    db.session.delete(admin)
    db.session.commit()
    
    return jsonify({"message": "Admin deleted successfully"}), 200

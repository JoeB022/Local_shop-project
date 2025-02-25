from flask import Blueprint, request, jsonify
from models.admin import Admin
from app import db, mail
from flask_mail import Message

admin_bp = Blueprint("admin_bp", __name__, url_prefix="/admins")

# Get all admins with pagination
@admin_bp.route("/", methods=["GET"])
def get_admins():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Admin.query.paginate(page=page, per_page=per_page, error_out=False)

    if not pagination.items:
        return jsonify({"message": "No admins found"}), 404

    return jsonify({
        'admins': [admin.to_dict() for admin in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200

# Create an admin and send an email notification
@admin_bp.route("/", methods=["POST"])
def create_admin():
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
            sender="your-email@example.com",
            recipients=[new_admin.email],
            body=f"Hello {new_admin.name},\n\nYour admin account has been successfully created!"
        )
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

    return jsonify(new_admin.to_dict()), 201

# Delete an admin
@admin_bp.route("/<int:id>", methods=["DELETE"])
def delete_admin(id):
    admin = Admin.query.get_or_404(id)
    db.session.delete(admin)
    db.session.commit()
    return jsonify({"message": "Admin deleted"}), 200

from flask import Blueprint, request, jsonify
from models.merchant import Merchant  # Import your Merchant model
from app import db, mail  # Import db and mail from app
from flask_mail import Message

merchant_bp = Blueprint("merchant_bp", __name__, url_prefix="/merchants")

# Get all merchants with pagination
@merchant_bp.route("/", methods=["GET"])
def get_merchants():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)

    pagination = Merchant.query.paginate(page=page, per_page=per_page, error_out=False)

    if not pagination.items:
        return jsonify({"message": "No merchants found"}), 404

    return jsonify({
        'merchants': [merchant.to_dict() for merchant in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': pagination.page
    }), 200

# Get a single merchant by ID
@merchant_bp.route("/<int:id>", methods=["GET"])
def get_merchant(id):
    merchant = Merchant.query.get_or_404(id)
    return jsonify(merchant.to_dict()), 200

# Create a new merchant and send email notification
@merchant_bp.route("/", methods=["POST"])
def create_merchant():
    data = request.get_json()
    
    if not data or not data.get("name") or not data.get("email"):
        return jsonify({"error": "Name and email are required"}), 400

    new_merchant = Merchant(name=data["name"], email=data["email"])
    db.session.add(new_merchant)
    db.session.commit()

    # Send confirmation email
    try:
        msg = Message(
            subject="Merchant Registration Successful",
            sender="your-email@example.com",
            recipients=[new_merchant.email],
            body=f"Hello {new_merchant.name},\n\nYour merchant account has been successfully created!"
        )
        mail.send(msg)
    except Exception as e:
        print(f"Error sending email: {e}")

    return jsonify(new_merchant.to_dict()), 201

# Update a merchant
@merchant_bp.route("/<int:id>", methods=["PUT"])
def update_merchant(id):
    merchant = Merchant.query.get_or_404(id)
    data = request.get_json()

    merchant.name = data.get("name", merchant.name)
    merchant.email = data.get("email", merchant.email)
    db.session.commit()
    
    return jsonify(merchant.to_dict()), 200

# Delete a merchant
@merchant_bp.route("/<int:id>", methods=["DELETE"])
def delete_merchant(id):
    merchant = Merchant.query.get_or_404(id)
    db.session.delete(merchant)
    db.session.commit()
    return jsonify({"message": "Merchant deleted"}), 200

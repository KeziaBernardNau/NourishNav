"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints.
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException
import hashlib
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_bcrypt import Bcrypt  # Add this import for Bcrypt
from flask_mail import Mail
from flask_mail import Message
from datetime import datetime, timedelta
import requests
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import uuid
from urllib.parse import quote
import smtplib
import ssl
from email.message import EmailMessage

api = Blueprint('api', __name__)

# Initialize Bcrypt here
bcrypt = Bcrypt()

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def createUser():
    name = request.json.get("name")
    password = request.json.get("password")
    email = request.json.get("email")
    age = request.json.get("age")
    height = request.json.get("height")
    weight = request.json.get("weight")
    activity_level = request.json.get("activity_level")
    user = User.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    user = User(password=password, name = name,  email = email, age = age, height= height, weight = weight, activity_level = activity_level, profile_picture = "")
    db.session.add(user)
    db.session.commit()
    response_body = {
        "msg": "User successfully added "
    }
    return jsonify(response_body), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user is None:
        return jsonify({"msg": "Please login"})
    else:
        return jsonify({"user_id": user.id, "email":user.email}), 200
# end of user related routes
@api.route('/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipes_data = [
        {
            'id': recipe.id,
            'title': recipe.title,
            'subtitle': recipe.subtitle,
            'desc': recipe.desc,
            'img_url': recipe.img_url,
            # Add other fields as needed
        }
        for recipe in recipes
    ]
    return jsonify(recipes_data)

@api.route('/updateUser', methods=['PUT'])
@jwt_required()
def updateUser():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    email = request.json.get("email")
    weight = request.json.get("weight")
    activity_level = request.json.get("activityLevel")
    profile_picture = request.json.get("profilePicture")

    user = User(email = email, weight = weight, activity_level = activity_level, profile_picture = profile_picture )
    db.session.update(user)
    db.session.commit()
    response_body = {
        "msg": "User successfully updated "
    }
    return jsonify(response_body), 200


@api.route('/recipes/<int:id>', methods=['GET'])
def recipe_detail(id):
    recipe = Recipe.query.get(id)
    if recipe:
        return jsonify({
            'id': recipe.id,
            'title': recipe.title,
            'subtitle': recipe.subtitle,
            'desc': recipe.desc,
            'img_url': recipe.img_url,
            # Add other fields as needed
        })
    else:
        return jsonify({"error": "Recipe not found"}), 404
    
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id, "user": user.serialize() }) ,200
# end of user related routes

# start of favorites routes
@api.route('/favorites', methods=['POST'])
@jwt_required()
def addFavorite():
    uid = get_jwt_identity()
    request_body = request.get_json()
    favorite = Favorites(uid = uid,recipe_name = repr(request_body['recipe_name']),)
    db.session.add(favorite)   
    db.session.commit()
    return jsonify(msg="okie ^^~")
  

@api.route('/favorites', methods=['DELETE'])
@jwt_required()
def removeFav():
    uid = get_jwt_identity()
    request_body = request.get_json()
    recipe_name=repr(request_body['recipe_name'])
    Favorites.query.filter_by(uid = uid, recipe_name=recipe_name).delete()
    db.session.commit()
    db.session.commit()
    return jsonify(msg="okie ^^~")

@api.route('/favorites', methods=['GET'])
@jwt_required()
def getFavorites():
    uid = get_jwt_identity()
    user = User.query.filter_by(id=uid).first()

    return jsonify(favorites=user.get_favorites())
# end of favorites routes

    


#Contact
@api.route('/contact', methods=['POST'])
def handle_contact_form():
    # Extract data from the request
    name = request.json.get('name')
    email = request.json.get('email')
    message = request.json.get('message')

  
    contact = contact(name=name, email=email, message=message)
    db.session.add(contact)
    db.session.commit()

    # Example: Send email notification
    # Replace this with your actual email sending logic
    def send_email_notification(name, email, message):
        # Assuming you have configured Flask-Mail in your Flask app
        mail = Mail()

        # Create the message
        msg = Message(subject="New Contact Form Submission",
                    sender=("Your Name", "your_email@example.com"),
                    recipients=["your_recipient_email@example.com"])  # Add your recipient email address here

        # Customize the email body
        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"

        # Send the email
        mail.send(msg)
        send_email_notification(name, email, message)

        # Respond to the client with a success message
        response_body = {
            "message": "Your message has been successfully submitted. We will get back to you soon!"
        }
        return jsonify(response_body), 200


@api.route('/forgotpassword', methods=['POST'])
def forgotpassword():
    try:
        body = request.get_json()
        email = body.get("email")

        if not email:
            print("No email was provided")
            return jsonify({"message": "No email was provided"}), 400

        user = User.query.filter_by(email=email).first()
        if not user:
            print("User doesn't exist")
            return jsonify({"message": "User doesn't exist"}), 404

        # Generate a reset token
        reset_token = str(uuid.uuid4())
        user.reset_token = quote(reset_token)
        db.session.commit()

        expiration_time = datetime.utcnow() + timedelta(hours=1)
        payload = {
            'email': email,
            'exp': expiration_time.timestamp(), 
            'reset_token': quote(reset_token)
        }
        access_token = create_access_token(identity=payload)

        # Email configuration
        FRONTEND_URL = os.getenv('FRONTEND_URL')
        SENDGRID_API_KEY = os.getenv('SENDGRID_API_KEY')
        URL_TOKEN = f"{FRONTEND_URL}/recoverPassword?token={access_token}"

        email_receiver = email
        email_subject = "Reset Your Password for NourishNav"
        email_body = (
            f"Hello,\n\nYou requested a password reset for your NourishNav account. "
            f"If you did not request this, please ignore this email.\n\n"
            f"Please use the following link to reset your password:\n{URL_TOKEN}\n\n"
            f"This link is valid for 1 hour. After that, you will need to request a new password reset.\n\n"
            f"Sincerely,\nThe NourishNav Team"
        )

        message = EmailMessage()
        message.set_content(email_body)
        message['Subject'] = email_subject
        message['From'] = 'travelbuddy4geeks@gmail.com'  
        message['To'] = email_receiver

        try:
            context = ssl.create_default_context()
            with smtplib.SMTP_SSL('smtp.sendgrid.net', 465, context=context) as server:
                server.login('apikey', SENDGRID_API_KEY)
                server.send_message(message)
            print("Password reset link sent to email.")
            print("Generated reset token:", reset_token)
            print("User reset token:", user.reset_token)
            return jsonify({"message": "Ok, Password reset link sent to email."}), 200
        except Exception as e:
            print(f"Error sending email: {e}")
            return jsonify({'error': str(e)}), 500

    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({'error': str(e)}), 500

@api.route('/recoverPassword', methods=['POST'])
@jwt_required()
def recoverPassword():
    body= request.get_json()
    identity = get_jwt_identity()
    if 'email' in identity:
        email = identity['email']
        user= User.query.filter_by(email=email).first()
        password=body.get("password")
        if user is not None:
            user.password=password
            db.session.commit()
            return jsonify("Password updated"), 200
    else:
        return jsonify("cannot find user"), 400
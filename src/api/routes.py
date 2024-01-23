"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "marta my super-secret login lorem ipsum"  # Change this!
jwt = JWTManager(app)

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def get_users():
    all_users = User.query.all()
    results = list(map(lambda user: user.serialize(), all_users))
    return jsonify(results),200

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    results = User.query.filter_by(id=user_id).first()
    return jsonify(results.serialize()), 200


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()
    print(user)

    if user == None:
        return jsonify({"msg":"Could not find email"}), 401
    if email != user.email or password != user.password:
        return jsonify({"msg": "Wrong email or password"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


#route to let the user signup 
@api.route("/signup", methods=["POST"])
def signup():
    request_body = request.get_jason()
    user = User.query.filter_by(email=request_body["email"]).first()
    if user is None:
        new_user = User(email=request_body["email"], password=request_body["password"], is_active=True)
        db.session.add(new_user)
        db.session.commit()
        response_body ={
            "msg": "User created suscessfully"
         }
        return jsonify(response_body), 201
    else:
        return jsonify({"msg": "An user associated with this email has already been created" }),401
    

# Protect a route with jwt_required, which will kick out requests
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
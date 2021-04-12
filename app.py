
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
# from api.HelloApiHandler import HelloApiHandler
import firebase_admin
from firebase_admin import credentials
import uuid


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

cred = credentials.Certificate('./keys.json')
default_app = initialize_app(cred)
db = firestore.client()
# todo_ref = db.collection('todos')


@app.route("/", defaults={'path':''})
def serve(path):
  return send_from_directory(app.static_folder,'index.html')

@app.route('/test', methods=['GET'])
def home():
  object1 = {"yp": "yo", "yo": "yo"}
  return object1


@app.route('/createSession', methods=['POST'])
def create():
    try:
        id = request.json['id']
        body = jsonify(uuid.uuid4().hex[:8])
        todo_ref.document(id).set(body)
        return jsonify({"success": True, "id": body}), 200
    except Exception as e:
        return f"An Error Occured: {e}"


# api.add_resource(HelloApiHandler, '/flask/hello')

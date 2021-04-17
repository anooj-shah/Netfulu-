
from flask import Flask, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
from firebase_admin import credentials, firestore, initialize_app
import uuid


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

cred = credentials.Certificate('./keys.json')
default_app = initialize_app(cred)
db = firestore.client()
sessions_ref = db.collection('sessions')


@app.route("/", defaults={'path':''})
def serve(path):
  return send_from_directory(app.static_folder,'index.html')

@app.route('/test', methods=['GET'])
def home():
  object1 = {"yp": "yo", "yo": "yo"}
  return object1


@app.route('/createSession', methods=['GET'])
def create():
  try:
    sessionId = uuid.uuid4().hex[:6]
    sessions_ref.document(sessionId).set({})
    return jsonify({"success": True, "id": sessionId}), 200
  except Exception as e:
    return f"An Error Occured: {e}"


# api.add_resource(HelloApiHandler, '/flask/hello')

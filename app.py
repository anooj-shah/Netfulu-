
from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
from firebase_admin import credentials, firestore, initialize_app
import uuid
import pandas as pd
from concurrent import futures


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)

cred = credentials.Certificate('./keys.json')
default_app = initialize_app(cred)
db = firestore.client()
sessions_ref = db.collection('sessions')
users_ref = db.collection('users')


@app.route("/", defaults={'path':''})
def serve(path):
  return send_from_directory(app.static_folder,'index.html')

@app.route('/test', methods=['GET'])
def home():
  object1 = {"yp": "yo", "yo": "yo"}
  return object1

@app.route("/getMovies", methods=['GET'])
def getMovies():
  samples = movies.sample(n=50)
  res = {"movie_names": samples.original_title.to_numpy().tolist(), "id": samples.id.to_numpy().tolist()}
  print(res)
  return jsonify(res), 200

@app.route('/login', methods=['POST'])
def login():
  # check if they are already in the db
  body = request.json
  print(body)
  username = body['username']
  doc_ref = db.collection(u'users').document(username)
  doc = doc_ref.get()
  result = None
  if doc.exists:
    print(f'Document data: {doc.to_dict()}')
    result = doc.to_dict()
    return jsonify({"success": True, "id": result['id'], "newUser": False })

  else:
    print(u'No such document!')
    userId = uuid.uuid4().hex[:6]
    users_ref.document(username).set({
      "id": userId
    })
    return jsonify({"success": True, "id": userId, "newUser": True })


@app.route('/createSession', methods=['GET'])
def create():
  try:
    sessionId = uuid.uuid4().hex[:6]
    sessions_ref.document(sessionId).set({})
    return jsonify({"success": True, "id": sessionId}), 200
  except Exception as e:
    return f"An Error Occured: {e}"


# api.add_resource(HelloApiHandler, '/flask/hello')

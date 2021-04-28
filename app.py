
from flask import Flask, send_from_directory, jsonify, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
from firebase_admin import credentials, firestore, initialize_app
import uuid
import pandas as pd
from concurrent import futures
from numpy import asarray
from numpy import save
from numpy import load
import numpy as np
import pickle

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

@app.route('/savePreferences', methods=['GET','POST'])
def savePreferences():
  body = request.json
  username = body['user']
  likes = body['likes']
  users_ref.document(username).set({
    "likes": likes
  })
  return jsonify({"success": True})

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
    return jsonify({"success": True, "newUser": False })

  else:
    print(u'No such document!')
    userId = uuid.uuid4().hex[:6]
    users_ref.document(username).set({})
    return jsonify({"success": True, "newUser": True })



@app.route('/createSession', methods=['GET'])
def create():
  try:
    sessionId = uuid.uuid4().hex[:6]
    sessions_ref.document(sessionId).set({})
    return jsonify({"success": True, "id": sessionId}), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/getGroupPredictionMat', methods=['POST'])
def get_group_prediction_mat(users, num_movie=19700):
  pickle_in = open("./movie_old2new_id_dict.pkl","rb")
  movie_old2new_id_dict = pickle.load(pickle_in)
  movie_new2old_id_dict = {}
  for key in movie_old2new_id_dict:
    movie_new2old_id_dict[movie_old2new_id_dict[key]] = key 
  predictions_mat = []
  body = request.json
  print(body)
  users = body['users']
  for username in users:
    doc_ref = db.collection(u'users').document(username)
    doc = doc_ref.get()
    result = None
    if doc.exists:
      result = doc.to_dict()
      predictions_mat.append(result['prediction_mat'])
    else:
      print("ERROR")
      return jsonify({"success": False })

  group_predictions = [0 for _ in range(num_movie)]
  for i in range (len(predictions_mat[0])):
    for j in range(len(predictions_mat)):
      group_predictions[i] += predictions_mat[j][i]
    
  # Get 50 highest rated movies
  top_50 = np.argsort(average_ratings)[-50:] # ID of 50 movies with the highest total preference
  movie_id_top_50 = []
  for i in range(len(top_50)):
    movie_id_top_50.append(movie_new2old_id_dict[top_50[i]])
  
  return movie_id_top_50

@app.route('/getUserPredictionMat', methods=['POST'])
def get_prediction_mat(num_movie=19700):
  pickle_in = open("./movie_old2new_id_dict.pkl","rb")
  movie_old2new_id_dict = pickle.load(pickle_in)
  body = request.json
  print(body)
  username = body['username']
  liked_movies = body['likedMovies']

  # Check if they are already in the database, if so make new_user_prediction_mat equal to that in Firestore
  # Else:
  dataP = load('./dataP.npy')
  dataQ = load('./dataQ.npy')
#     liked_movies = [2294,3186,1566,588,1907,783,1836,1022, 1193]
  new_user = [0 for _ in range(num_movie)]
  for movie_id in liked_movies:
    new_user[movie_old2new_id_dict[movie_id]] = 1.0
  new_user_latent_factors = np.matmul(new_user, dataQ)
  new_user_prediction_mat = np.matmul(new_user_latent_factors, dataQ.T)
  
  # Add to firestore
  doc_ref = db.collection(u'users').document(username)
  doc = doc_ref.get()
  result = None
  if doc.exists:
    users_ref.document(username).set({
      "prediction_mat": new_user_prediction_mat.tolist()
    }, 
    merge=True)
    return jsonify({"success": True})
  else:
    print("ERROR")
    return jsonify({"success": False })


# api.add_resource(HelloApiHandler, '/flask/hello')


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
import pickle5 as pickle

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app) #comment this on deployment
api = Api(app)
ignore = [318,2959,58559,4993,260,296,527,593,858,68954,4226,2762,48780,143355,3578,4973,74458,2028,1682,44191,4886,110,4896,111759,4995,8368,8961,1721,40815,54001,5618,1265,166643,293,480,5816,1580,1732,4011,1089,84152,364,8874,608,1213,77561,45722,541,778,780,6934,86332,8665,5995,2324,6373,46578,1246,85414,588,1961,586,48385,3114,2011,41566,6016,54503,81847,47099,135536,924,111,30793,30707,97938,1653,47610,2115,88744,169864,2291,49530,2012,7451,595,150,94959,96821,597,750,2,2617,1968,31658,51540,31696,457,93840,31685]
pickle_in = open("./movie_old2new_id_dict.pkl","rb")
movie_old2new_id_dict = pickle.load(pickle_in)
movie_new2old_id_dict = {}
for key in movie_old2new_id_dict:
  movie_new2old_id_dict[movie_old2new_id_dict[key]] = key
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

@app.route('/joinSession', methods=['POST'])
def join():
  body = request.json
  username = body['user']
  session = body['session']
  session_ref = sessions_ref.document(session)
  participant_collection = session_ref.collection("participants")
  query = participant_collection.where('username', '==', username).get()
  if(len(query)==0):
    participant_collection.document().set({
      "username": username
    })
  return jsonify({"success": True })
  

@app.route('/createSession', methods=['GET'])
def create():
  try:
    sessionId = uuid.uuid4().hex[:6]
    sessions_ref.document(sessionId).set({})
    return jsonify({"success": True, "id": sessionId}), 200
  except Exception as e:
    return f"An Error Occured: {e}"

@app.route('/getGroupPredictionMat', methods=['POST'])
def get_group_prediction_mat(num_movie=19700):
   
  predictions_mat = []
  body = request.json
  print(body)
  users = body['users']
  sessionId = body['session']
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
  top_50 = np.argsort(group_predictions)[-300:] # ID of 50 movies with the highest total preference
  print(top_50)
  movie_id_top_50 = []

  movie_pickle_in = open("./movies_metadata.pkl","rb")
  movie_data_df = pickle.load(movie_pickle_in)

  movie_title_in = open("./title_movieId_dict.pkl","rb")
  movie_title_dict = pickle.load(movie_title_in)

  for i in range(len(top_50)):
    old_movie_id = movie_new2old_id_dict[top_50[i]]
    if old_movie_id in movie_data_df["movieId"].values:
      movie_id_top_50.append(int(old_movie_id))
    if(len(movie_id_top_50)>=50):
      break;
  print(movie_id_top_50)


  # print("TITLES", movie_title_dict)
  top50_movie_names = []
  for i in range(len(movie_id_top_50)):
    top50_movie_names.append(movie_title_dict[movie_id_top_50[i]])
    sessions_ref.document(sessionId).collection("recomendations").document().set({
      'name': movie_title_dict[movie_id_top_50[i]]
    })

  return jsonify({"success": True, "top50names": top50_movie_names })


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
  for i in ignore:
    new_user_prediction_mat[movie_old2new_id_dict[i]] = 0
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

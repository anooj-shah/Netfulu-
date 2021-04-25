
from flask import Flask, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS 
from firebase_admin import credentials, firestore, initialize_app
import uuid
import pandas as pd
import os
import requests
from concurrent import futures

# IMDB_key = os.environ["IMDB"]

movies = pd.read_csv('./data/movies_metadata.csv',header=0,usecols=["id", "imdb_id", "original_title"])
print(movies)
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

# imdb_url = "https://imdb-api.com/en/API/SearchMovie/"+IMDB_key +"/"
# def get_imdb_img(url):
#   res = requests.get(url)
#   try:
#       return res.json()
#   except:
#       return res.text

@app.route("/getMovies", methods=['GET'])
def getMovies():
  samples = movies.sample(n=50)
  res = {"movie_names": samples.original_title.to_numpy().tolist(), "id": samples.id.to_numpy().tolist()}
  print(res)
  return jsonify(res), 200
  # images = []
  # urls = [imdb_url + mov.original_title for i, mov in samples.iterrows()]
  # return 

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

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory
} from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from './firebaseContext';

function RecsPage() {
  let { sessionId, username } = useParams();
  let homeURL = 'https://localhost:3000'
  let url = "http://localhost:5000";
  // const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  let history = useHistory();
  function copyURL(){
    const destination = homeURL+'/session/'+sessionId;
    navigator.clipboard.writeText(destination);
  }
  useEffect(() => {
    axios.post(url + '/joinSession', {
      user: username,
      session: sessionId
    })
  }, [])

  function generateRecommendations() {
    console.log("YPPPP", participants.length, participants)
    let users = [];
    for (let i = 0; i < participants.length; i++) {
      users.push(participants[i].username);
    }
    console.log(users);
    axios.post(url+'/getGroupPredictionMat', {
      users: users
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log("Error");
    })
  }

  // const [participants] = useCollectionData(query, { idField: 'id' });

  const [participants] = useCollectionData(firestore.collection('sessions').doc(sessionId).collection('participants'));
  console.log("participants", participants);


  return (
  <div className="RecsPage">
          <div className="recs-rest flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div class="flex mb-8">
                <p className="font-bold py-2 px-4 mt-4 text-4xl focus:outline-none">Share with friends:</p>
                <button className="tooltip font-bold text-black bg-blue-200 py-2 px-4 mt-4 text-4xl focus:outline-none rounded-lg" onClick = {copyURL}>
                  {homeURL+'/session/'+sessionId}
                  <span class="tooltiptext text-sm">Click to copy</span>
                </button>
                
              </div>
              <button class="bg-blue-700 text-white font-bold py-2 px-4 mt-4 text-4xl focus:outline-none rounded rounded-lg" 
                onClick={generateRecommendations}
              >
                Generate Recommendations
              </button>
              <br />
              
            </div>
          </div>
          <div className='recs-participants'>
                <h1 className="part-title font-bold text-black mt-4 text-3xl focus:outline-none">Participants:</h1>
                {
                  participants && (participants.length !== 0) 
                  ? 
                    (participants.map((p) => 
                    <div className="participant text-black">
                      {p.username}  
                    </div>))
                  :
                  <div className="text-xl font-bold">
                    There are currently no participants!
                  </div>
                }
          </div>
          <div className='recs'>
              
          </div>
  </div>

  )
}

export default RecsPage;

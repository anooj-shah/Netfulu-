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
    let users = [];
    for (let i = 0; i < participants.length; i++) {
      users.push(participants[i].username);
    }
    console.log(users);
    axios.post(url+'/getGroupPredictionMat', {
      users: users
    })
  }

  // const [participants] = useCollectionData(query, { idField: 'id' });

  const [participants] = useCollectionData(firestore.collection('sessions').doc(sessionId).collection('participants'));
  console.log("participants", participants);


  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center">
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
              <div>
                <h1 className="font-bold py-2 px-4 mt-4 text-3xl text-center focus:outline-none">Participants:</h1>
                {
                  participants && (participants.length !== 0) 
                  ? 
                    (participants.map((p) => 
                    <div>
                      {p.username}  
                    </div>))
                  :
                  <div className="text-xl font-bold">
                    There are currently no participants!
                  </div>
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecsPage;

import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { firestore } from './firebaseContext';

function SessionPage(props) {
  let { sessionId } = useParams();
  let url = "http://localhost:5000/";

  // const [participants] = useCollectionData(query, { idField: 'id' });

  const [participants] = useCollectionData(firestore.collection('sessions').doc("1234").collection('participants'));
  console.log("participants", participants);
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div class="flex">
                <p className="text-black font-bold py-2 px-4 mt-4 text-4xl focus:outline-none">Share with friends:</p>
                <p className="text-black font-bold bg-blue-200 py-2 px-4 mt-4 text-4xl focus:outline-none rounded rounded-lg">{url+sessionId}</p>
              </div>
              <br />
              <div>
                <h1 className="text-black font-bold py-2 px-4 mt-4 text-3xl focus:outline-none">Participants:</h1>
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

export default SessionPage;

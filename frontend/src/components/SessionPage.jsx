import React, { useState, useEffect } from 'react';
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

function SessionPage(props) {
  let { sessionId } = useParams();
  let url = "http://localhost:5000/";
  const [modal, setModal] = useState(true);
  const [username, setUsername] = useState("");
  const [newUser, setNewUser] = useState(false);
  let history = useHistory();

  // const [participants] = useCollectionData(query, { idField: 'id' });

  const [participants] = useCollectionData(firestore.collection('sessions').doc(sessionId).collection('participants'));
  console.log("participants", participants);

  function handleLogin() {
    let url = "http://localhost:5000"
    console.log("Username", username);
    axios.post(url + "/login", {
      "username": username
    })
    .then((response) => {
      console.log(response);
      let res = response.data;
      if (res.newUser) {
        setNewUser(true);
      }
      setModal(false);
      if (res.newUser) {
        history.push({
          pathname: '/onboarding/'+username,
        });
      }
      else {
        history.push({
          pathname: '/recs/',
        });
      }

    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          {modal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-full md:w-1/3 my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Login/ Sign Up
                    </h3>
                    <button
                      className="z-30 p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => {
                        setModal(false);
                      }}
                    >
                      <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-4 flex-auto w-full">
                    <div className="mb-0 pt-0">
                        {/* <FormLabel component="legend" className="text-black text-3xl">Shipping Method</FormLabel> */}
                        <h3 className="text-xl mb-2">
                          Enter username 
                        </h3>
                        <input 
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }} 
                          value={username}
                          className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </input>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b">
                    <button onClick={handleLogin} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Login/Signup
                    </button>
                    {/* <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-0"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={() => {
                        setModal(false);
                      }}
                    >
                      Sign up instead
                    </button> */}
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <div class="flex">
                <p className="text-black font-bold py-2 px-4 mt-4 text-4xl focus:outline-none">Share with friends:</p>
                <Link className="text-black font-bold bg-blue-200 py-2 px-4 mt-4 text-4xl focus:outline-none rounded-lg" to = {sessionId}>{url+sessionId}</Link>
              </div>
              <br />
              <div>
                <h1 className="text-black font-bold py-2 px-4 mt-4 text-3xl text-center focus:outline-none">Participants:</h1>
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

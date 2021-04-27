
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

 export default function HomePage() {
  let history = useHistory();
  const [sess, setSess] = useState("");
  function updateDirect(event){
    setSess(event.target.value);
  }
  function directSession(){
    history.push({
      pathname: '/session/'+sess,
    });
  }
  function createSession() {
    // let sessionId = "1234";
    // history.push({
    //   pathname: '/session/'+sessionId,
    // });
    axios.get('http://localhost:5000/createSession')
    .then(response => {
      console.log("Response", response);
      let sessionId = response.data.id;
      history.push({
        pathname: '/session/'+sessionId,
      });
    })
    .catch(err => {
      console.log("Error", err);
    })
  }
  return (
    <>
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-around">
              <button class="bg-blue-700 text-white font-bold py-2 px-4 mt-4 text-5xl focus:outline-none rounded rounded-lg" onClick={createSession}>
                Create Party
              </button>
              <form className="flex flex-col justify-left">
                <span className="flex flex-row justify-center my-10">
                  <input  onChange={updateDirect} type="text" placeholder="Enter session ID" className="text-black rounded-l-lg py-2 px-4 h-16 focus:outline-none"></input>
                  <button className="bg-green-500 text-white font-bold py-2 px-4 text-5xl focus:outline-none rounded-r-lg h-16" onClick={directSession}>Join Session</button>
                </span>
              </form>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
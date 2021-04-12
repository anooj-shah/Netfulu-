
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

 export default function HomePage() {
  let history = useHistory();

  function createSession() {
    let sessionId = "1234"
    history.push({
      pathname: '/session/'+sessionId,
    });
    // axios.get('http://localhost:5000/createSession')
    // .then(response => {
    //   console.log("Response", response);
    //   let sessionId = 1234;
    //   history.push({
    //     pathname: '/session/'+sessionId,
    //   });
    // })
    // .catch(err => {
    //   console.log("Error", err);
    // })
  }
  return (
    <div className="w-full h-full absolute top-0 left-0">
      <div className="w-screen h-screen absolute top-0 left-0">
        <div className="h-full w-full absolute top-0 left-0 flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center">
              <button class="bg-blue-700 text-white font-bold py-2 px-4 mt-4 text-5xl focus:outline-none rounded rounded-lg" onClick={createSession}>
                Create Party
              </button>
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
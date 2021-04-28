
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
    <div className="homepage-container">
      <div className="half description">
        <div className="instruction-container text-4xl">
          <p>
            We'll take care of the recommendations... you take care of the chill 😉
          </p>
        </div>
      </div>
      <div className="half">
              <div className="flex flex-col items-center justify-center h-full">
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
    </>
  )
}
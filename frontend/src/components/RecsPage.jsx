import React, {useState} from 'react';
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
  const [users,setUsers] = useState();
  const {sessionId, username} = useParams();
  const url = "http://localhost:5000";
  axios.post(url+"/joinSession", {
    user: username,
    session: sessionId
  }).then((res)=>{
    console.log("joined session as "+ username);
    axios.post(url+"/getUsers",{
      session: sessionId
    })
  });
  return (
    <div>
      
    </div>
  )
}

export default RecsPage;

import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyD3P1sLN81cXZYV2fY-0NrpEB0L6FC46Ps",
  authDomain: "netfulu-e88fb.firebaseapp.com",
  projectId: "netfulu-e88fb",
  storageBucket: "netfulu-e88fb.appspot.com",
  messagingSenderId: "180140121605",
  appId: "1:180140121605:web:6f3660c31e9fdba017c66c",
//   apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})

export const firestore = firebase.firestore();

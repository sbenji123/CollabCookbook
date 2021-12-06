// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQqF7A6s9spolN6B1z8VXXWuEEcrZYcv4",
  authDomain: "collab-cookbook.firebaseapp.com",
  projectId: "collab-cookbook",
  storageBucket: "collab-cookbook.appspot.com",
  messagingSenderId: "284310268700",
  appId: "1:284310268700:web:30922cc8730c665d4fe8d9",
  measurementId: "G-2GE54DZRST"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const store = firebase.firestore().settings({ timeStampsInSnapshots: true})
firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({ timeStampsInSnapshots: true})

export default firebase;
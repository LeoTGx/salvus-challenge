import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDabvhcflxEB6k95csO3rhJ8Qg1MYlxtAo",
    authDomain: "salvus-challenge.firebaseapp.com",
    projectId: "salvus-challenge",
    storageBucket: "salvus-challenge.appspot.com",
    messagingSenderId: "975199922762",
    appId: "1:975199922762:web:b80f0943516780e61554b3",
    measurementId: "G-PDDTYZ1412"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

  export default firebase
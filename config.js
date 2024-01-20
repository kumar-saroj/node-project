const firebase = require('firebase')
const firebaseConfig = {
    apiKey: "AIzaSyBj4J7bLvkfpAIPUg1m1ovT-0h7GZAPh1s",
    authDomain: "node-get-data.firebaseapp.com",
    projectId: "node-get-data",
    storageBucket: "node-get-data.appspot.com",
    messagingSenderId: "415158736169",
    appId: "1:415158736169:web:cef71dd08bf68c362dd338"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore()
  const User = db.collection('Users')
  module.exports = User
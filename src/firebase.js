import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyAg_LXLBirbofWOJSZL7DzKT8LjvD9LAXI",
    authDomain: "reactblog-ca5e0.firebaseapp.com",
    databaseURL: "https://reactblog-ca5e0.firebaseio.com",
    projectId: "reactblog-ca5e0",
    storageBucket: "reactblog-ca5e0.appspot.com",
    messagingSenderId: "804958008461"
  };

  firebase.initializeApp(config);

  export const database = firebase.database().ref('/posts');
  
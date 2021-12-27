import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBV1WRHW6Y_LuXbXtAz19UqmUF5z0Fe0Nw",
    authDomain: "booksuggester-84faf.firebaseapp.com",
    projectId: "booksuggester-84faf",
    storageBucket: "booksuggester-84faf.appspot.com",
    messagingSenderId: "776179650797",
    appId: "1:776179650797:web:965e7c18af892bca7c3ce4",
    measurementId: "G-E4Q375CQ24"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
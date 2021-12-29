import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAWo9SvxOW4qvYf-iyFg8Tq1ZYNzhmJ5GM",
    authDomain: "booksuggester-94bd1.firebaseapp.com",
    projectId: "booksuggester-94bd1",
    storageBucket: "booksuggester-94bd1.appspot.com",
    messagingSenderId: "1083435225479",
    appId: "1:1083435225479:web:2b08b2b9011a5be26cc322",
    measurementId: "G-G9Q0SQZYFS"
  };
  
  export const createUserProfileDocument = async(userAuth, additionalData) =>{
        if(!userAuth) return;

        const userRef = firestore.doc(`users/${userAuth.uid}`);
        const snapShot = await userRef.get();
        // console.log(snapShot);

        if(!snapShot.exists){
            const {displayName, email} = userAuth;
            const createAt = new Date();

            try{
                await userRef.set({
                    displayName,
                    email,
                    createAt,
                    ...additionalData
                })
            } catch(error){
                console.log('error creating user: ', error.message);
            }
        }

        return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account'});
  export const signInWithGoogle = ()=> auth.signInWithPopup(provider);

  export default firebase;
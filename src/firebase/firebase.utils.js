import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyARIe4Barz1euPc2pA5JSErcbYwsVnt4Mk",
  authDomain: "crwn-db-77498.firebaseapp.com",
  databaseURL: "https://crwn-db-77498.firebaseio.com",
  projectId: "crwn-db-77498",
  storageBucket: "crwn-db-77498.appspot.com",
  messagingSenderId: "334568777475",
  appId: "1:334568777475:web:82dca26abee0b2b2732b36",
  measurementId: "G-NQXYHE3Y3J",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

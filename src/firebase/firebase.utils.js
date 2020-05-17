import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDkJ956MfgGVYh5t_fEIj0f186GoCImW4w',
  authDomain: 'crwn-db-f28f6.firebaseapp.com',
  databaseURL: 'https://crwn-db-f28f6.firebaseio.com',
  projectId: 'crwn-db-f28f6',
  storageBucket: 'crwn-db-f28f6.appspot.com',
  messagingSenderId: '888466396220',
  appId: '1:888466396220:web:fc9b8c848165ff6b325f39',
  measurementId: 'G-7YF1JR7N8P',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`user/${userAuth.uid}`);

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
      console.log('error create user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

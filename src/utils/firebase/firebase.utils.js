
import { initializeApp } from 'firebase/app';
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider, } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3Cjngs_BkHNS4hXj6X5Nw_E9gCJ3SM7I",
    authDomain: "crown-clothing-db-be40c.firebaseapp.com",
    projectId: "crown-clothing-db-be40c",
    storageBucket: "crown-clothing-db-be40c.appspot.com",
    messagingSenderId: "684182546833",
    appId: "1:684182546833:web:ce03d07ee0b84c62385230"
  };
  
  // Initialize Firebase

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
    });

    export const auth = getAuth();
    export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 

    export const db = getFirestore();
    export const createUserDocumentFromAuth = async(userAuth) => {
      const userDocRef = doc(db,'users', userAuth.uid);

      console.log(userDocRef);

      const userSnapshot = await getDoc(userDocRef);
      console.log(userSnapshot.exists());

      if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
          await setDoc(userDocRef, {
            displayName,email,createdAt
          });
        } catch(error) {
          console.log('error creating the user', error.message);
        }
      }
      return userDocRef;
    }

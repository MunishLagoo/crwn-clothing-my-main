
import { initializeApp } from 'firebase/app';
//firebase auth
import { getAuth, 
         signInWithRedirect, 
         signInWithPopup, 
         GoogleAuthProvider,
         FacebookAuthProvider,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,  
         signOut
        } from 'firebase/auth';


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
  const facebookProvider = new FacebookAuthProvider();
  

  googleProvider.setCustomParameters({
    prompt: "select_account"
    });

  facebookProvider.setCustomParameters({
    prompt: "select_account"
  });

    export const auth = getAuth();
    export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); 
    export const signInWithFaceBookPopup = () => signInWithPopup(auth,facebookProvider);

    export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);
    
    export const createAuthUserWithEmailAndPassword = async(email, password) => {
      if(!email || !password) return;

      return await createUserWithEmailAndPassword(auth, email, password);
    };
    
    export const signInAuthWithEmailAndPassword = async(email, password) => {
      if(!email || !password) return ;

      return await signInWithEmailAndPassword(auth, email, password);
    }

    export const signOutUser = async() =>  await signOut(auth);
    
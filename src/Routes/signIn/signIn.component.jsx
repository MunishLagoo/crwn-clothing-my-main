
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup, signInWithGoogleRedirect, auth } from '../../utils/firebase/firebaseAuth.utils.js';
import {  createUserDocumentFromAuth } from '../../utils/firebase/firestoreDB.utils.js';

import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';

const SignIn = () => {
     useEffect(() => {
        async function fetchData() {
            const response = await getRedirectResult(auth);
            console.log(response);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }
        }
         fetchData();
   },[]);


    const logGoogleUser = async() => {
        //const response = await signInWithGooglePopup();
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

 return (
    <div> 
        <h1> Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        <button onClick={signInWithGoogleRedirect}>sign in with Google Redirect</button>
        <SignUpForm />

    </div>
 );

}

export default SignIn;
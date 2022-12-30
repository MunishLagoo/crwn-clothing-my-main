
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth } from '../../utils/firebase/firebaseAuth.utils.js';
import {  createUserDocumentFromAuth } from '../../utils/firebase/firestoreDB.utils.js';

import SignUpForm from '../../Components/sign-up-form/sign-up-form.component';
import SignInForm from '../../Components/sign-in-form/sign-in-form.component';

import './authentication.styles.scss';


const Authentication = () => {
     useEffect(() => {
        async function fetchData() {
            const response = await getRedirectResult(auth);
            //console.log(response);
            if (response) {
                await createUserDocumentFromAuth(response.user);
            }
        }
         fetchData();
   },[]);



 return (
    <div className='authentication-container'> 
        <SignInForm />
        <SignUpForm />

    </div>
 );

}

export default Authentication;
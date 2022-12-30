
import { useState } from 'react';

import { signInAuthWithEmailAndPassword, signInWithGooglePopup, signInWithGoogleRedirect, signInWithFaceBookPopup } from '../../utils/firebase/firebaseAuth.utils.js';
import {  createUserDocumentFromAuth } from '../../utils/firebase/firestoreDB.utils.js';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password:'',    
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event)=> {
        event.preventDefault();

        
        try {
           const response = await signInAuthWithEmailAndPassword(email,password);
                                  
           console.log(response);
            resetFormFields();
        } catch(error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user is associated with this email');
                    break;
                default:
                    console.log(error);
                    break;
            }
            
           
        }
    };

    const handleChange = (event)=> {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const logGoogleUser = async() => {
        //const response = await signInWithGooglePopup();
        const { user } = await signInWithGooglePopup();
         await createUserDocumentFromAuth(user);
    }

    const logFacebookUser= async() => {
        const response = await signInWithFaceBookPopup();
        console.log(response);
        await createUserDocumentFromAuth(response.user);
    }


    return (
        <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span> Sign in with your email and password</span>
        <form onSubmit={handleSubmit}>
      
            <FormInput label='Email' 
            type='email' 
            required 
            onChange={handleChange} 
            name='email' 
            value={email} 
            />
       
            <FormInput label='Password' 
            type='password' 
            required 
            onChange={handleChange} 
            name='password'  
            value={password} 
            />
            <div className='button-container'>
                <Button type='submit'>Sign In</Button>
                <Button type='button' buttonType='google' onClick={logGoogleUser}>Google Sign in</Button>
                
            </div>
            
        </form>


        </div>
    );
}

export default SignInForm;
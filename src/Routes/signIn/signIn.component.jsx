
import { signInWithGooglePopup } from '../../utils/firebase/firebaseAuth.utils.js';
import {  createUserDocumentFromAuth } from '../../utils/firebase/firestoreDB.utils.js';
const signIn = () => {

    const logGoogleUser = async() => {
        //const response = await signInWithGooglePopup();
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

 return (
    <div> 
        <h1> Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </div>
 );

}

export default signIn;

//firestore DB
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
  } from 'firebase/firestore';

//Firestore DB 
//singleton db instance
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  //doc(DB,Collection,DocumentID)

  const userDocRef = doc(db,'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,email,createdAt,...additionalInformation,
      });
    } catch(error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
}

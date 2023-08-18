import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import {
    getFirestore,
    doc, //used to retrieve documents from our db in firebase
    getDoc, // used to access the docs
    setDoc, // used to set data in the docs
    collection,
    writeBatch,
    query,
    getDocs,
    QuerySnapshot
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0-sKu1Q6sGh2uXmnDfzjdxAOKkAqEGZo",
    authDomain: "code-crushed-wears-db.firebaseapp.com",
    projectId: "code-crushed-wears-db",
    storageBucket: "code-crushed-wears-db.appspot.com",
    messagingSenderId: "276604609214",
    appId: "1:276604609214:web:659fbca63afec017a8b4ef"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  




  // databse
  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
    })

    await batch.commit();
    console.log("done")
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapshots = await getDocs(q);
    const categoryMap = querySnapshots.docs.reduce((accumulator, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      accumulator[title.toLowerCase()] = items;
      return accumulator
    }, {})

    return categoryMap
  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
    additionalInformation = {}
    const userDocRef = doc(db, "users", userAuth.uid); //trying to pass in the data we get from the userauthenticatiion.. it takes the databse first and then the document name and then the uid

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch(error) {
            console.log("error creating the user", error.message);
        }

        return userDocRef
    }

    //if user data does not exist

    //create/set the doc with the data from userAuth in my collection
    //if user data exists

    //return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }

  export const signInUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
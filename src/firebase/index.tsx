import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut } from "@firebase/auth";
import { getFirestore,
    collection,
    addDoc } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB1jcAxvBVx7boNG0b9yTFu7tAdzJ4D7Zc",
    authDomain: "harrypottermyapi.firebaseapp.com",
    projectId: "harrypottermyapi",
    storageBucket: "harrypottermyapi.appspot.com",
    messagingSenderId: "1044475916000",
    appId: "1:1044475916000:web:840b2f49da33d63d58ea85",
    measurementId: "G-F5713YZBFF"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password).then((response) => {
            console.log(response);
        });
    } catch (error) {
        console.log(error);
    }
}

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'users'), {
            uid: user.uid,
            name: name,
            authProvider: "local",
            email: email,
            password: password
        })
    } catch (error) {
        console.log(error);
    }
}

const sendPasswordReset = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.log(error);
    }
}

const logout = () => {
    signOut(auth);
}

export {
    auth,
    db,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout
}
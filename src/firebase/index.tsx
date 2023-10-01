import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    sendPasswordResetEmail, 
    signOut } from "@firebase/auth";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB1jcAxvBVx7boNG0b9yTFu7tAdzJ4D7Zc",
    authDomain: "harrypottermyapi.firebaseapp.com",
    projectId: "harrypottermyapi",
    storageBucket: "harrypottermyapi.appspot.com",
    messagingSenderId: "1044475916000",
    appId: "1:1044475916000:web:840b2f49da33d63d58ea85"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const authResponse = await signInWithEmailAndPassword(auth, email, password);
        const callResponse = await getDocs(query(collection(db, "users"), where("email", "==", email)));
        if (callResponse.empty) {
            return [
                {
                    status: 404
                },
                {
                    uid: '',
                    username: '',
                    email: '',
                    phone: '',
                    jwt: '',
                    authProvider: ''
                }
            ]
        }
        const data = callResponse.docs[0].data();
        return [
            {
                status: 200
            },
            {
                uid: authResponse.user.uid,
                username: data.username,
                email: data.email,
                phone: data.phone,
                jwt: await authResponse.user.getIdToken(),
                authProvider: authResponse.user.providerId
            }
        ]
    } catch (error) {
        return [
            {
                status: 400
            },
            {
                uid: '',
                username: '',
                email: '',
                phone: '',
                jwt: '',
                authProvider: ''
            }
        ]
    }
}

const registerWithEmailAndPassword = async (name: string, email: string, password: string, phone:string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, 'users'), {
            username: name,
            email: email,
            phone: phone
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

const logOut = async () => {
    await signOut(auth);
}

export {
    auth,
    db,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logOut
}
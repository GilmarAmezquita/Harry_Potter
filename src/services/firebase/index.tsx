import { initializeApp } from "firebase/app";
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut } from "@firebase/auth";
import { getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    where } from "@firebase/firestore"
import { getStorage, 
    ref,
    uploadBytesResumable,
    listAll,
    getDownloadURL,
} from "@firebase/storage";

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
const storage = getStorage(app);

const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
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

const logOut = () => {
    signOut(auth);
    window.location.reload();
}

const uploadImage = async (file:any, characterId:string | undefined) => {
    if (!characterId) return;
    const storageRef = ref(storage,`/characters/${characterId}/${file.name}`);
    await uploadBytesResumable(storageRef, file);
    window.location.reload();
}

const getImageByCharacterId = async (characterId: string | undefined, pushImage: (url: string) => void) => {
    if (!characterId) return [];
    const storageRef = ref(storage, `/characters/${characterId}`);
    const imageList = await listAll(storageRef);
    
    const imagePromises = imageList.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        pushImage(url);
    });
    
    const images = await Promise.all(imagePromises);
    return images;
};


export {
    auth,
    db,
    storage,
    uploadImage,
    getImageByCharacterId,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
    logOut
}
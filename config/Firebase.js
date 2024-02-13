
// COMPONENTS
import { apiKeys } from "./apiKeys";

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

//funkce na login
import { getAuth, GoogleAuthProvider } from "firebase/auth";

//funkce pro databazi
import{ getFirestore } from "firebase/firestore";

//funkce pro storage
import{ getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: apiKeys.googleApiKey,
    authDomain: "midfuckgame.firebaseapp.com",
    projectId: "midfuckgame",
    storageBucket: "midfuckgame.appspot.com",
    messagingSenderId: "123458543400",
    appId: "1:123458543400:web:5089972fe61c9b0e0efa1d",
    measurementId: apiKeys.googleId
};

//firebase init
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

//login var
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

//var pro databazi
export const db = getFirestore(app);

//var pro storage
export const storage = getStorage(app);

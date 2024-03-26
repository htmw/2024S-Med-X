// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVe1Rjk5oFHP57-ZRgG9nm-S62hZZQpd4",
  authDomain: "med-x-5f2b4.firebaseapp.com",
  databaseURL: "https://med-x-5f2b4-default-rtdb.firebaseio.com",
  projectId: "med-x-5f2b4",
  storageBucket: "med-x-5f2b4.appspot.com",
  messagingSenderId: "9302046680",
  appId: "1:9302046680:web:38444a4847e45702f664ad",
  measurementId: "G-LR1NET7P9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app)
export { storage, auth , db};
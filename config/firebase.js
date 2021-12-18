// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmCmlNGCTUb6GH-YlNFBZ-o23STpCFINY",
  authDomain: "hackathon-saylani.firebaseapp.com",
  projectId: "hackathon-saylani",
  storageBucket: "hackathon-saylani.appspot.com",
  messagingSenderId: "208242807248",
  appId: "1:208242807248:web:65ee60f7bc83564972e9d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// export { storage };
export {db, auth};
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFx-uFtnpLPDuHaWrK0i0GQwAEoC1M0Wo",
  authDomain: "badbank-b611f.firebaseapp.com",
  projectId: "badbank-b611f",
  storageBucket: "badbank-b611f.appspot.com",
  messagingSenderId: "497940635442",
  appId: "1:497940635442:web:9b36af933d1d89d2f9412b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();



export default {auth};
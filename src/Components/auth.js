import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
const firebaseConfig = {

    apiKey: "AIzaSyCFx-uFtnpLPDuHaWrK0i0GQwAEoC1M0Wo",
    authDomain: "badbank-b611f.firebaseapp.com",
    projectId: "badbank-b611f",
    storageBucket: "badbank-b611f.appspot.com",
    messagingSenderId: "497940635442",
    appId: "1:497940635442:web:9b36af933d1d89d2f9412b"
        };
        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig);
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        // get elements
        const email    = document.getElementById('email');
        const password = document.getElementById('password');
        const login    = document.getElementById('login');
        const signup   = document.getElementById('signup');
        const logout   = document.getElementById('logout');
    
        // login
        login.addEventListener('click', e => {
            const auth  = app.auth();		
            const promise = auth.signInWithEmailAndPassword(email.value, password.value);
            promise.catch(e => console.log(e.message));
        });
    
        // signup
        signup.addEventListener('click', e => {
            // TODO: check for real email
            const auth  = app.auth();
            const promise = auth.createUserWithEmailAndPassword(email.value,password.value);
            promise.catch(e => console.log(e.message));
        });
    
        // logout
        logout.addEventListener('click', e => {
            app.auth().signOut();
        });
    
        // login state
        app.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                logout.style.display = 'inline';
                login.style.display  = 'none';
                signup.style.display = 'none';
            }
            else{
                console.log('User is not logged in');
                logout.style.display = 'none';			
                login.style.display  = 'inline';
                signup.style.display = 'inline';
            }
        });
    

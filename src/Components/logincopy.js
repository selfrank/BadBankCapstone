import {Card} from './context';
import React from 'react';
import {UserContext} from '../App';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


//import {useCurrentUser} from './currentusercontext';

export default function LoginCopy(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const [data, setData] = React.useState('');  
  
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
          const [email, setEmail]       = React.useState('');
          const [password, setPassword] = React.useState('');
          const [login, setLogin]       = React.useState('');
          const [signup, setSignUp] = React.useState('');
          const [logout, setLogout]   = React.useState('');
          
          
          const auth = getAuth();    
          // login

                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
            //login state
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        // User is signed in, see docs for a list of available properties
                        // https://firebase.google.com/docs/reference/js/firebase.User
                        const uid = user.uid;
                        // ...
                    } else {
                        // User is signed out
                        // ...
                    }
                    });
          /*// signup
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
*/
return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      data={data}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setData={setData} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus} setData={setData}/>}
    />
  ) 
}

function LoginMsg(props){ 
  console.log("loginmsg", props.data);
  return(<>
    <h5>Success</h5> 
    <button type="submit" 
      className="btn btn-light" 
      onClick=
      {()=> {
      props.setShow(true);
      }
      }>
        Authenticate again
    </button>
    <button type="submit" 
      className="btn btn-light" 
      onClick=
      {()=> {
      props.setShow(true);
      props.setStatus('');
      }
      }>
        Log Out
    </button>
    
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  //const [data, setData] = React.useState(''); 
 


  const ctx = React.useContext(UserContext);  

  function handle(){
    fetch(`http://localhost:3000/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('Welcome '+data.name)
            props.setShow(false)
            props.setData(text)
            console.log('login JSON:', data)
        } catch(err) {
            props.setStatus(text)
            props.setData(text)
            console.log('err:', text);
        }
    });

  }




  return (<>
    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
    <button className="google-button">Login with Google</button>
   
  </>);
}
 
  
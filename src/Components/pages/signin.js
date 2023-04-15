import { useStoreActions } from "easy-peasy";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import firebaseService from "../firebase";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import {Card} from "../context";

export default function SignInPage(){

  return (<>
    <Card
      bgcolor="secondary"
      header="Sign In"  
      body={SignInBody()}
    />
    </>
  )
  }

function SignInBody(){
  const location = useLocation();
  const history = useHistory();
  const [fields, setFields] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const setAuthorized = useStoreActions((actions) => actions.setAuthorized);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        firebaseService.auth,
        fields.email,
        fields.password
      );
      if (user) {
        history.push("/");
        console.log("pushed")
        setAuthorized();
        console.log("Called");
        
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email address or password.");
    }
  };

  const googleSignIn = (e) => {
    //e.preventDefault();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("google user: ", user);
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });

  };

  return (
    <main>
      {location.state && location.state.message ? (
        <p style={{ color: "green" }}>{location.state.message}</p>
      ) : null}
    
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="password">Password</label>
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            required
          />
        </div>
        {error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <div style={{ marginTop: "1rem" }}>
          <button type="submit" onClick={googleSignIn}>Google Signin</button>
        </div>
    </main>
  );
}
import { useState } from "react";
import { useHistory } from "react-router-dom";
import firebaseService from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

export default function SignUpPage() {
  const [fields, setFields] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const navigate = useHistory();

  

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
		
    if (fields.password.length < 6) {
      return setError("Password must be at least 6 characters in length.");
    }
    if (fields.confirmPassword !== fields.password) {
      return setError("Password and confirm password must match.");
    }
    let email= fields.email;
    let password= fields.password;
    let name=fields.name;
    try {
      const req =  fetch(`http://localhost:3001/account/create/${name}/${email}/${password}`)
      .then(response => response.text())
      .then(text => {
      const data = JSON.parse(text);
      const message = {data};
        try{
          createUserWithEmailAndPassword(
            firebaseService.auth,
            fields.email,
            fields.password)
        } catch (err) {
          console.log(err);
          setError("Invalid email address or password.");
        }
        
          
      return navigate("/signin", {
        replace: true,
        state: {
          message
        }
      })});
    } catch (err) {
      const errMessage = err.response.data.error;
      return setError(errMessage);
    }
  };

  

  return (
    <div>
      <h1>Sign Up</h1>
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
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={fields.name}
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
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={fields.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
        <div style={{ marginTop: "1rem" }}>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
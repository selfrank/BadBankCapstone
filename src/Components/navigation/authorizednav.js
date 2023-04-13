import { Link, useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import firebaseService from "../firebase";

export default function AuthorizedNav() {
  const history = useHistory();
  const logUserOut = async () => {
    await firebaseService.auth.signOut();
  };
  const moveToHome=()=>{
    history.push("/")
  }
  function logOut(){
    moveToHome();
    logUserOut();
  }
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [record, setRecord]=useState();
  const [username, setUsername]=useState();
  const getUser = async () => {
    const email = await firebaseService.auth.currentUser.email;
    fetch(`http://localhost:3001/account/findOne/${email}`)
    .then(response => response.text())
    .then (text=>{
      try {
        const data = JSON.parse(text);
        setUser(data);
        setLoadingUser(false);
        console.log("user",user)
        setRecord(data);
        setUsername(data.name);
      }
     catch (err) {
      console.error(err);
    }
  })};

  useEffect(() => {
    getUser();
  }, []);
 console.log(record)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">BadBank</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/myaccount/">My Account</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/deposit/">Deposit</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/withdraw/">Withdraw</a>
        </li>    
        <li className="nav-item">
          <button type="button" className="btn btn-light" 
            onClick={logOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
      <span className="navbar-text">
          <a className="nav-link" href="/mydata/">{username}'s Details</a>
    </span>
      </div>
    </nav>
  );
}
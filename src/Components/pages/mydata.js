import { useEffect, useState } from "react";
import firebaseService from "../firebase";
import {Link} from "react-router-dom";
import axios from "axios";

const Record = (props) => (
  <><br/>
  <h4>Quick Links:</h4><br/>
      <Link className="btn btn-link" to={`/withdraw/${props.record._id}`}>Withdraw</Link> |
      <Link className="btn btn-link" to={`/deposit2/${props.record._id}`}>Deposit</Link> |
      </>);


      
export default function DashboardPage() {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [record, setRecord]=useState();
  const getUser = async () => {
    const token = await firebaseService.auth.currentUser.getIdToken(true);
    const email = await firebaseService.auth.currentUser.email;
    fetch(`http://161.35.96.121:3001/account/findOne/${email}`)
    .then(response => response.text())
    .then (text=>{
      try {
        const data = JSON.parse(text);
        setUser(data);
        setLoadingUser(false);
        console.log("user",user)
        setRecord(data);
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
    <>
      <h1>My Data</h1>
      {loadingUser ? (
        <p>Loading User</p>
      ) : (<>
        <div>
          
          <p>Id: {user._id}</p>
          <p>Name: {user.name}</p>
          <p>Balance: ${user.balance}</p>
          <p>Email: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
         </>
      )}
    </>
  );
}

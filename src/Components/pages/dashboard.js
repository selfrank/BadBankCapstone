import { useEffect, useState } from "react";
import firebaseService from "../firebase";
import {Link} from "react-router-dom";
import {Card} from '../context';

const Record = (props) => (
  <><br/>
  <h4>Quick Links:</h4><br/>
      <Link className="btn btn-link text-light" to={`/withdraw/${props.record._id}`}>Withdraw</Link> |
      <Link className="btn btn-link text-light" to={`/deposit2/${props.record._id}`}>Deposit</Link> |
      </>);

export default function DashboardPage(){
 

return (<>
  <Card
    bgcolor="info"
    header="Dashboard"
    

    body={Dashboard()}
  />
  </>
)
}
      
function Dashboard() {

  
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
    <br/>
      <h1>Dashboard</h1>
      {loadingUser ? (
        <p>Loading User</p>
      ) : (<>
        <div>
          
          <p>Name: {user.name}</p>
          <p>Balance: ${user.balance}</p>
          <p>Email: {user.email}</p>
        </div>
           <Record
           record={record}
           key={record._id}
         />
         </>
      )}
    </>
  );
}

import {Card} from '../context';
import React, {useState, useEffect} from 'react';
import {UserContext} from '../../App';
import firebaseService from "../firebase";

export default function Withdraw(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={show ? 
        <WithdrawForm setShow={setShow} setStatus={setStatus}/> :
        <WithdrawMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function WithdrawMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() =>    
        {
          props.setShow(true);
          props.setStatus('');
      }}>
        Withdraw again
    </button>
  </>);
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const ctx = React.useContext(UserContext);  

    ///////////////////////////////////////////////////////////////////////////////////////
    const [record, setRecord] = React.useState();
    const [loadingUser, setLoadingUser] = useState(true);
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState();
    const [currentBalance, setCurrentBalance] = useState();
    const [currentUsername, setCurrentUsername] = useState();
    const getUser = async () => {
    const email = await firebaseService.auth.currentUser.email;
    fetch(`http://161.35.96.121:3001/account/findOne/${email}`)
    .then(response => response.text())
    .then (text=>{
      try {
        const data = JSON.parse(text);
        setUser(data);
        setLoadingUser(false);
        console.log("user line 24",user)
        setRecord(data);
        setUserEmail(data.email);
        setCurrentBalance(data.balance);
        setCurrentUsername(data.name);
      }
     catch (err) {
      console.error(err);
    }
  })};

  useEffect(() => {
    getUser();
  }, []);
 console.log("Line 34 record",userEmail)
  
//////////////////////////////////////////////////////////////////////////////////////
    

  function handle(){
    const email = userEmail;
    const newAmount = amount*-1
    console.log (newAmount)
    fetch(`http://161.35.96.121:3001/account/update/${email}/${newAmount}`)
      .then(response => response.text())
      .then(text => {
          try {
              const data = JSON.parse(text);
              props.setStatus(data.value.name+"'s blance: $"+JSON.stringify(data.value.balance));
              props.setShow(false);
              console.log('JSON:', data);
          } catch(err) {
              props.setStatus('Withdraw failed')
              console.log('err:', text);
          }
      });
    }

  return(<>

  
    <h5>{currentUsername}'s current balance: <br/>
    ${currentBalance}</h5><br/>

    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
    </button>

  </>);
}

import {Card} from '../context';
import React from 'react';
import {UserContext} from '../../App';
import {useEffect} from 'react';
import { useCurrentUser, CurrentUserContext } from '../currentusercontext';
//import {useCurrentUser} from './currentusercontext';

export default function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    
  const [data, setData] = React.useState('');  
  const [user, setUser] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState(CurrentUserContext);
  
  console.log("login user",currentUser)
  //const ctx = React.useContext(CurrentUserContext); 
  
  useEffect(()=>{
    setCurrentUser(currentUser)
  })
  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      data={data}
      currentUser={currentUser}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus} setData={setData} setCurrentUser={setCurrentUser} /> :
        <LoginMsg setShow={setShow} setStatus={setStatus} setData={setData} setCurrentUser={setCurrentUser}/>}
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
 


 

  function handle(){
    fetch(`http://localhost:3001/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('Welcome '+data.name)
            props.setShow(false)
            props.setData(text)
            props.setCurrentUser(data)
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
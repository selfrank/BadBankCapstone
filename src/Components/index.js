
import {CreateAccount} from '/createaccount';
import AllData from './alldata';
import Deposit from './deposit';
import Home from './home';
import Login from './login';
import NavBar from './navbar';
import Balance from './balance';
import Withdraw from './withdraw';
import Auth from './auth';
import {Route, Link, BrowserRouter}  from 'react-router-dom';
import {UserContext} from 'react';
import React from "react"; 


function Spa() {
  return (
    <BrowserRouter>
      <div>
        <NavBar/>        
        <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
          <div className="container" style={{padding: "20px"}}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            {/* <Route path="/transactions/" component={Transactions} /> */}
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default Spa;

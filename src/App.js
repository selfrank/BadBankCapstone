import logo from './logo.svg';
//import './App.css';
import CreateAccount from './Components/createaccount';
import AllData from './Components/alldata';
import Deposit from './Components/deposit';
import Home from './Components/home';
import Login from './Components/login';
import NavBar from './Components/navbar';
import Balance from './Components/balance';
import Withdraw from './Components/withdraw';
import Auth from './Components/auth';
import { BrowserRouter,RouterProvider,HashRouter,Route, Switch, withRouter} from 'react-router-dom';
import React from "react"; 
export const UserContext = React.createContext(null);




function App() {
  return (
    <BrowserRouter>
      <NavBar/>        
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <div className="container" style={{padding: "20px"}}>
          <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/CreateAccount/" component={CreateAccount} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/deposit/" component={Deposit} />
          <Route exact path="/withdraw/" component={Withdraw} />
          {/* <Route path="/transactions/" component={Transactions} /> */}
          <Route exact path="/balance/" component={Balance} />
          <Route exact path="/alldata/" component={AllData} />
          <Route exact path="/auth/" component={Auth}/>
          </Switch>
        </div>
      </UserContext.Provider>
  </BrowserRouter>
  
  );
}

export default withRouter (App);

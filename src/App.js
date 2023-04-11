//import logo from './logo.svg';
//import './App.css';

import CreateAccount from './Components/pages/createaccount';
import AllData from './Components/pages/alldata';
import Deposit from './Components/pages/deposit';
import Home from './Components/pages/home';
import Login from './Components/pages/login';
import NavBar from './Components/navigation/navbar';
import Balance from './Components/pages/balance';
import Withdraw from './Components/pages/withdraw';
import SignInPage from './Components/pages/signin';
import Auth from './Components/logincopy';
import { BrowserRouter,RouterProvider,HashRouter,Route, Switch, withRouter} from 'react-router-dom';
import React from "react"; 
import { CurrentUserProvider } from './Components/currentusercontext';
import LoginCopy from './Components/logincopy';
import SignUpPage from './Components/pages/signup';
export const UserContext = React.createContext(null);





function App() {
  return (
    <BrowserRouter>
      <NavBar/>        
      <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
        <CurrentUserProvider>
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
          <Route exact path="/auth/" component={LoginCopy}/>
          <Route exact path="/signin/" component={SignInPage}/>
          <Route exact path="/signup/" component={SignUpPage}/>
          </Switch>
        </div>
        </CurrentUserProvider>
      </UserContext.Provider>
  </BrowserRouter>
  
  );
}

export default withRouter (App);

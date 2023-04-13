import { BrowserRouter,Router,withRouter, Switch, Route } from "react-router-dom";
import AuthorizedNav from "./navigation/authorizednav";
import DashboardPage from "./pages/dashboard";
import Withdraw from "./pages/withdraw";
import AllData from './pages/alldata';
import Deposit from './pages/deposit';
import Home from './pages/home';
import Balance from './pages/balance';
import MyData from './pages/mydata';

export default function UnauthorizedRoutes() {
  return (
    <BrowserRouter>
      <AuthorizedNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/myaccount/" component={DashboardPage}/>
        <Route exact path="/deposit/" component={Deposit} />
          <Route exact path="/withdraw/" component={Withdraw} />
          {/* <Route path="/transactions/" component={Transactions} /> */}
          <Route exact path="/balance/" component={Balance} />
          <Route exact path="/alldata/" component={AllData} />
          <Route path="/deposit2/:id" component={Deposit}/>
          <Route path="/withdraw/:id" component={Withdraw} />
          <Route exact path = "/mydata/" component = {MyData} />
          <Route exact path="/signin/" component={Home} />
        <Route
          path="*"
          element={
            <main>
              <p>Not found.</p>
            </main>
          }
        />
      </Switch>
    </BrowserRouter>
  );
}
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UnauthorizedNav from "./navigation/unauthorizednav";
import Home from "./pages/home";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import CreateAccount from "./pages/createaccount";
import DashboardPage from "./pages/dashboard";
export default function UnauthorizedRoutes() {  
  return (
    <BrowserRouter>
      <UnauthorizedNav />
      <div className="container" style={{padding: "20px"}}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup/" component={SignUpPage} />
        <Route exact path="/signin/" component={SignInPage} />
        <Route exact path="/create/" componnet={CreateAccount}/>
        <Route exact path="/myaccount/" component={Home}/>
        <Route
          path="*"
          element={
            <main>
              <p>Not found.</p>
            </main>
          }
        />
      </Switch>
      </div>
    </BrowserRouter>
  );
}
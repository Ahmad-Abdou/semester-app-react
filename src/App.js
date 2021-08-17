import "./App.css";
import Signin from "./components/Signin";
import Organisationer from "./components/Organisationer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";
import EmailValidation from "./components/EmailValidation";
import ResetPassword from "./components/ResetPassword";
import AdminRequests from "./components/AdminRequests";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signin></Signin>
          </Route>
          <Route path="/menu">
            <Menu></Menu>
          </Route>
          <Route path="/reset">
            <ResetPassword></ResetPassword>
          </Route>
          <Route path="/request">
            <AdminRequests></AdminRequests>
          </Route>
          <Route path="/emailvalid">
            <EmailValidation></EmailValidation>
          </Route>
          <Route path="/organisationer">
            <Organisationer></Organisationer>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

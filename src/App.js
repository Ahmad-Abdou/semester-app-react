import "./App.css";
import Signin from "./components/Signin";
import Organisationer from "./components/Organisationer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";

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
          <Route path="/organisationer">
            <Organisationer></Organisationer>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

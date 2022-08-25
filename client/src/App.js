import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit";
import Details from "./components/Details";
import Cruds from "./components/Cruds";
import { Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import { useState } from "react";
import Products from "./components/Products";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <>
      <Navbaar />
      <Switch>
        <Route exact path="/">
          {user && user._id ? <Home /> : <Login setLoginUser={setLoginUser} />}
        </Route>

        <Route exact path="/cruds">
          {user && user._id ? <Cruds /> : <Login setLoginUser={setLoginUser} />}
        </Route>

        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route path="/user_register" component={Registerauth} /> */}

        {/* <Route path="/cruds" component={Cruds} /> */}
        <Route path="/register" component={Register} />
        <Route path="/edit/:id" component={Edit} />
        <Route path="/profile/:id" component={Details} />

        <Route path="/hydrogen" component={Products} />

        <Route path="/login">
          <Login setLoginUser={setLoginUser} />
        </Route>

        {/* <Route path="/egisterauth">
          <Registerauth />
        </Route>*/}
      </Switch>
    </>
  );
}

export default App;

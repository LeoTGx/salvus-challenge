import "./App.css";
import React from "react";
import { BrowserRouter as Router , Route} from "react-router-dom";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import NewUserRegister from "./components/Info.js";
import Login from "./components/Login.js";
import CreateUser from "./components/CreateUser.js";
import Home from "./components/Home.js";
import Dashboard from "./components/Dashboard.js"
import "./css/Styles.css"


const App = () => {

  
  return (
  <AuthProvider>
    <Router>
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/userinfo" component={NewUserRegister} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={CreateUser} />      
      </div>
    </Router>
  </AuthProvider>
  );
};

export default App;

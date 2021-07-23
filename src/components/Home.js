import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import firebase from "../firebase.js";
import {Button} from "./Styles"

const Home = () => {
  const history = useHistory();

  const goToUserInfo = () => {
      history.push("/userinfo");
  }

  const goToDashboard = () => {
    history.push("/dashboard");
}

  return (
    <div>
      <div className="header header-text">
      <Button onClick={() => firebase.auth().signOut()}>Sair</Button>
          {/* TODO: colocar logo */}
        </div>  
      <div className="vertical-layout vertical-layout--center">
        
          <h1>Home</h1>
          <Button onClick={goToUserInfo}>Meus dados</Button>
          <Button onClick={goToDashboard}>Dashboard</Button>
          
      </div>
    </div>
  );
};

export default withRouter(Home);
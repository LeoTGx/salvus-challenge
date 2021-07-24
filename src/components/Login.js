import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";
import {Button, Input} from "./Styles"

const Login = ({ history }) => {

  const doLogin = useCallback(
    async e => {
      e.preventDefault();
      const [ email, password ] = e.target.elements;
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const goToSignUp = () => {
    history.push("/signup");
}

  return (
    <div>
      <div className="header header-text">
        <Button onClick={goToSignUp}>Criar Conta</Button>
          {/* TODO: colocar logo */}
      </div>  
      <div className="vertical-layout vertical-layout--center">
        <h1>Log in</h1>
        <div className="vertical-layout vertical-layout--center" >
          <form className="vertical-layout vertical-layout--center" onSubmit={doLogin}>
            <label className="vertical-layout vertical-layout--center" >
              Email
              <Input name="email" type="email" placeholder="Email" />
            </label>
            <label className="vertical-layout vertical-layout--center" >
              Password
              <Input name="password" type="password" placeholder="Password" />
            </label>
            <Button width="100px" type="submit">Entrar</Button>
          </form>
        </div>
        
      </div>

      </div>
  );
};

export default withRouter(Login);

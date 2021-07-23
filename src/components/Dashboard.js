import React ,{ useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebase.js";
import {Button} from "./Styles"



const Dash = () => {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        firebase.firestore().collection('doctors').onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setUsers(docs);
        });
      };
    
    useEffect(() => {
        getData();
      }, []);

    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    }


  return (
    <div>
      <div className="header header-text">
        <Button onClick={goToHome}>Voltar</Button>
          {/* TODO: colocar logo */}
      </div>  
   
        <div className="vertical-layout vertical-layout--center" >
            {users.map((user) => (
              <div>
                <h1>Profissão: {user.profissao}</h1>
                <h1>Nome: {user.nome}</h1>
              </div>
            ))}
        </div>
    </div>
  );
};

export default Dash;
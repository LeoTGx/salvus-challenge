import React, { useState, useEffect} from "react";
import { useHistory} from "react-router-dom";
import firebase from "../firebase.js";
import {Button, Input} from "./Styles"


const UserInfo = () => {
    const history = useHistory();
    const [nome, setName] = useState('')
    const [telefone, setTel] = useState('')
    const [genero, setGen] = useState('')
    const [profissao, setProf] = useState('')
    const [especialidade, setEspec] = useState('')
    const [image, setImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [url, setUrl] = useState("");

    const getData = async () => {
        firebase.firestore().collection('doctors').onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            if(doc.id === firebase.auth().currentUser.uid)
                docs.push({ ...doc.data(), id: doc.id });
          });
          setUsers(docs);
        });
      };

    useEffect(() => {
        getData();
    }, []);


    const goToHome = () => {
        history.push("/");
    }
    const onUpdateTel = e =>{     
        e.preventDefault();
        
        try{
            firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).update({telefone}).then(() => {

            })
        } catch (error) {
            alert(error);
        }
    }

    const onUpdateName = e =>{
        e.preventDefault();
       
        console.log("no enter")

        try{
            firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).update({nome}).then(() => {

            })
        } catch (error) {
            alert(error);
        }
    }
    
    const onUpdateGen = e =>{
        e.preventDefault();

        try{
            firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).update({genero}).then(() => {
  
            })
        } catch (error) {
            alert(error);
        }
    }
    const onUpdateProf = e =>{
        e.preventDefault();

        try{
            firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).update({profissao}).then(() => {
  
            })
        } catch (error) {
            alert(error);
        }
    }
    const onUpdateEspec = e =>{
        e.preventDefault();

        try{
            firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).update({especialidade}).then(() => {
  
            })
        } catch (error) {
            alert(error);
        }
    }
    
    const handleChange = e => {
        e.preventDefault();

        if (e.target.files[0]) {
          setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = e => {
        e.preventDefault()
        const uploadTask = firebase.storage().ref(`images/`+firebase.auth().currentUser.uid+`/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          snapshot => {},
          error => {
            console.log(error);
          },
          () => {
            firebase.storage()
              .ref("images")
              .child(firebase.auth().currentUser.uid)
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                setUrl(url)
              });
          }
        );
      };

    return(
        <div>
            <div className="header header-text">
                <Button onClick={goToHome}>Voltar</Button>
                <Button onClick={() => firebase.auth().signOut()}>Sair</Button>
                {/* TODO: colocar logo */}
             </div> 
             
            <div className="horizontal-layout horizontal-layout--space-evenly" >
                                    <div className="vertical-layout vertical-layout--center">
                                    
                            <label>Nome completo</label>
                            <Input type="text" placeholder="Novo nome" value={nome} onChange={e => setName(e.currentTarget.value)} />
                            <Button onClick={onUpdateName}>Atualizar nome</Button> 

                            <label>Telefone</label>
                            <Input type="text" placeholder="Novo telefone" value={telefone} onChange={e => setTel(e.currentTarget.value)} />   
                            <Button onClick={onUpdateTel}>Atualizar telefone</Button> 

                            <label>G??nero</label>
                            <Input type="text" placeholder="Novo g??nero"  value={genero} onChange={e => setGen(e.currentTarget.value)} />   
                            <Button onClick={onUpdateGen}>Atualizar g??nero</Button> 

                            <label>Profiss??o</label>
                            <Input type="text" placeholder="Nova profiss??o" value={profissao} onChange={e => setProf(e.currentTarget.value)} />   
                            <Button onClick={onUpdateProf}>Atualizar profiss??o</Button> 
                            <label>Especialidade</label>
                            <Input type="text" placeholder="Nova especialidade" value={especialidade} onChange={e => setEspec(e.currentTarget.value)} />   
                            <Button onClick={onUpdateEspec}>Atualizar especialidade</Button> 
                    </div>     

                

                
                <div >
                    {users.map((user) => (
                    <div>
                        <h1>Nome: {user.nome}</h1>
                        <h1>Telefone: {user.telefone}</h1>
                        <h1>G??nero: {user.genero}</h1>
                        <h1>Profiss??o: {user.profissao}</h1>
                        <h1>Especialidade: {user.especialidade}</h1>
                    </div>
                    ))}
                </div>
                

            </div>
            <div className="horizontal-layout horizontal-layout--center">
                <form key = {2}>
                    <div>
                        <Input type="file" onChange={handleChange}/>
                        <Button onClick={handleUpload}>Upload</Button>
                    </div>
                </form>
            </div>            
                <div className="horizontal-layout horizontal-layout--center">
                    <br/>
                    {url}
                </div>

        </div>
       
    );
};

export default UserInfo



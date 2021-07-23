import React, { useCallback , useContext} from "react";
import useState from 'react-usestateref'
import { withRouter , Redirect } from "react-router";
import firebase from "../firebase.js";
import { AuthContext } from "../Auth.js";
import DatePicker from "react-date-picker";
import Dropdown from './StateCityDrop';
import {Button, Input, Select} from "./Styles"







const CreateUser = ({ history }) => {
  const [data_nascimento,onDateChange] = useState(new Date())

  const [checkedItems, setCheckedItems,checkRef] = useState(0);

  const handleChange = (event) => {

    setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
  }


  const checkboxes = [
    {
        name: 'Recife',
        key: 'recife',
        label: 'Recife',
    },
    {
      name: 'Olinda',
      key: 'olinda',
      label: 'olinda',
    },
    {
        name: 'Maceió',
        key: 'maceio',
        label: 'Maceio',
    },
    {
      name: 'Arapiraca',
      key: 'arapiraca',
      label: 'arapiraca',
    }
  ];


  const doNewAccount = useCallback(e => {
    e.preventDefault();
    const email = e.target.elements.email
    const password = e.target.elements.password
    const nome_completo =  e.target.elements.name
    const telefone =  e.target.elements.telefone
    const genero =  e.target.elements.genero
    const profissao =  e.target.elements.profissao
    const profissao_especialidade = e.target.elements.especialidade
    const localidade = [e.target.elements.estado.value,e.target.elements.cidade.value]

    try {
       firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value).then(cred => {
          return firebase.firestore().collection('doctors').doc(cred.user.uid).set({
            email: email.value,
            nome: nome_completo.value,
            nascimento: data_nascimento,
            telefone: telefone.value,
            genero: genero.value,
            profissao: profissao.value,
            especialidade: profissao_especialidade.value,
            localidade: localidade,
            disponibilidade: checkRef.current,
          })
        }).then(() => {
          history.push("/");
        }) 
    } catch (error) {
      alert(error);
    }
  }, [history]);

  const { currentUser } = useContext(AuthContext);


  if (currentUser) {
    return <Redirect to="/" />;
  }


  const goToLogin = () => {
      history.push("/login");
  }
  return (
      <div className="BG">
        <div className="header header-text">
          <Button onClick={goToLogin}>Login</Button>
        {/* TODO: colocar logo */}
        </div>  
      <div className="horizontal-layout horizontal-layout--center" >
        <form  className="teste" onSubmit={doNewAccount}>
          <h4>Detalhes da conta</h4>
          <div>
              <label>
              Email   
              <Input name="email" type="email" placeholder="Email" />
              </label>
          </div>
          <div>
            <label>
              Password    
              <Input name="password" type="password" placeholder="Password" />
            </label>
          </div>
          <h4>Detalhes Pessoais</h4>
          <div>
            <label>
              Nome Completo   
              <Input name="name" type="text" placeholder="Nome Completo" />
            </label>
          </div>
          <div>
            <label> Data De Nascimento</label>
            <DatePicker value={data_nascimento} onChange={onDateChange} />
          </div>
          <div>
            <label>
              Telefone   
              <Input name="telefone" type="text" placeholder="Telefone"  />
            </label>
          </div>
          <div>
            <label>
              Gênero   
              <Select width="200px" height="50px" placeholder="Genero" name="genero"  >
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Prefiro não especificar</option>
                <option>Outro</option>
              </Select>
            </label>
          </div>
          <h4>Detalhes Profissionais</h4>
          <div>
            <label>
              Profissão
              <Select placeholder="Profissão" name="profissao"  >
                <option>Médico</option>
                <option>Enfermeiro</option>
                <option>Assistente de Enfermagem</option>
              </Select>
            </label>
          </div>
          <div>
            <label>
              Especialidade   
              <Select placeholder="Especialidade" name="especialidade"  >
                <option>Odontologia</option>
                <option>Estetica</option>
                <option>Neurologia</option>
              </Select>
            </label>
          </div>
          <div>
            <React.StrictMode>
              <Dropdown />
            </React.StrictMode>
          </div>
          <div>
            <h4>Onde pode atender</h4>
            <label>
            <lable>Cidades que pode atender: </lable> <br/>
              {
                  checkboxes.map(item => (
                      <label key={item.key}>
                          {item.name}
                          <Input type="checkbox" name={item.name} checked={checkedItems[item.name]} onChange={handleChange} />
                      </label>
                  ))
              }
            </label>
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
      
    </div>
  );
};

export default withRouter(CreateUser);

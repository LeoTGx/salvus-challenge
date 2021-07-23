import firebase from "../firebase.js";


function updateInfo(){
    const app = document.querySelector(".info")
    firebase.firestore().collection('doctors').doc(firebase.auth().currentUser.uid).get().then(doc => {
        const html = `
            <div>E-mail:  ${doc.data().email} <br/> Nome completo: ${doc.data().nome} <br/> Telefone: ${doc.data().telefone}</div>
        `;
        app.innerHTML=html
    });
}

export default updateInfo
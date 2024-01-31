import React, {useEffect, useState} from 'react';
import Home from './view/screen/home'; // Ajusta la ruta según la ubicación de tu componente Home
import Login from './view/screen/loginScreen';
import axios from 'axios';
import './App.css';

// import bcrypt from 'bcrypt'
// const bcrypt = require('bcrypt');

function App() {
  const [screenSelect, setScreenSelect]=useState('Home');
  const [trabajadores, setTrabajadores] = useState([])

  useEffect(() => {
    obtenerTrabajadores();
  }, []);
  useEffect(()=>{console.log(trabajadores)},[trabajadores]);

  const obtenerTrabajadores = () => {
    axios.get('http://localhost:5000/trabajadores')
      .then((response) => {
        setTrabajadores(response.data);
        let auxValue=response.data[0];
        // DetectarPasswords('12345',auxValue[Contrasena]);
      })
      .catch((error) => {
        console.error('Error al obtener datos desde el servidor: ', error);
      });
  };

  // const DetectarPasswords=(passwordFromUser,hashedPasswordFromDatabase)=>{
  //   bcrypt.compare(passwordFromUser, hashedPasswordFromDatabase, (err, result) => {
  //     if (err) {
  //       console.error("Error al comparar contraseñas: ", err);
  //       // Manejar el error
  //     } else {
  //       if (result) {
  //         console.log("La contraseña es válida");
  //         // Permitir el acceso
  //       } else {
  //         console.log("La contraseña no es válida");
  //         // Denegar el acceso
  //       }
  //     }
  //   });
  // }

  return (
    <div className="App">
      {/* Contenido del componente Home */}
      {screenSelect=='Home' && <Home onHandleClick={setScreenSelect}/>}
      {screenSelect=='Login' && <Login />}
    </div>
  );
}

export default App;
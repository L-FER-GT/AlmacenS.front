import React, {useEffect, useState} from 'react';
import Home from './view/screen/home'; // Ajusta la ruta según la ubicación de tu componente Home
import Login from './view/screen/loginScreen';
import RegisterUser from './view/screen/register';
import { Container } from '@mui/material';
import axios from 'axios';
import './App.css';

function App() {
  const [screenSelect, setScreenSelect]=useState('NewUser');
  const [usuarios, setUsuarios] = useState([])

  // useEffect(() => {
  //   obtenerUsuarios();
  // }, []);

  // useEffect(()=>{console.log(usuarios)},[usuarios]);

  // const obtenerUsuarios = () => {
  //   axios.get('http://localhost:5000/listUsuarios')
  //     .then((response) => {
  //       setUsuarios(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error al obtener datos desde el servidor: ', error);
  //     });
  // };

  

  return (
    <div className="App">
      {/* Contenido del componente Home */}
      {screenSelect=='Home' && <Home onHandleClick={setScreenSelect}/>}
      {screenSelect=='Login' && <Login />}
      {screenSelect=='NewUser' && <RegisterUser onChangeScreen={setScreenSelect}/>}
    </div>
  );
}

export default App;
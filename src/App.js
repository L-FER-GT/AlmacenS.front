import React, { useEffect, useState } from "react";
import Home from "./view/screen/home"; // Ajusta la ruta según la ubicación de tu componente Home
import Login from "./view/screen/loginScreen";
import RegisterUser from "./view/screen/register";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.css";

//funciones de llamadas al backend
import { getUsers } from "./conexion/ConsultasUsers";

function App() {
  const [screenSelect, setScreenSelect] = useState("Login");
  const [usuarios, setUsuarios] = useState([]);

  function obtenerUsuarios(){
    getUsers({
      onCallData: (data) => {
        const userArray = data.map((item) => item.Usuario);
        setUsuarios(userArray);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  }

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div className="App">
      {/* Contenido del componente Home */}
      {screenSelect == "Home" && <Home onHandleClick={setScreenSelect} />}
      {screenSelect == "Login" && (
        <Login users={usuarios} onChangeScreen={setScreenSelect} />
      )}
      {screenSelect == "NewUser" && (
        <RegisterUser onChangeScreen={setScreenSelect} users={usuarios} />
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import Home from "./view/screen/home"; // Ajusta la ruta según la ubicación de tu componente Home
import Login from "./view/screen/loginScreen";
import RegisterUser from "./view/screen/register";
import "./App.css";

//funciones de llamadas al backend
import { getUsers } from "./conexion/ConsultasUsers";

function App() {
  const [screenSelect, setScreenSelect] = useState("Home");
  const [usuarios, setUsuarios] = useState([]);
  const [idUser, setIdUser] = useState(null);

  function obtenerUsuarios() {
    getUsers({
      onCallBackData: (data) => {
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
      {screenSelect === "Home" && (
        <Home
          onChangeScreen={setScreenSelect}
          onRefleshUser={obtenerUsuarios}
          idUser={idUser}
        />
      )}
      {screenSelect === "Login" && (
        <Login
          users={usuarios}
          onChangeScreen={setScreenSelect}
          onInitUser={setIdUser}
        />
      )}
      {screenSelect === "NewUser" && (
        <RegisterUser
          onChangeScreen={setScreenSelect}
          users={usuarios}
          onRefleshUser={obtenerUsuarios}
        />
      )}
    </div>
  );
}

export default App;

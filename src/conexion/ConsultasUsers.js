import { enlace } from "./Contastes";
import { getConsult } from "./GenerateConeccion";
import { setConsult } from "./GenerateConeccion";

export const getUsers = ({ onCallData, onError }) => {
    getConsult(`${enlace}/listUsuarios`, { onCallData, onError })
};

export const setRegisterNewUser = ({ onCallData, onError, sendData}) => {
    setConsult(`${enlace}/newUser`, { onCallData, onError, sendData})
};

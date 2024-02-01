import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult } from "./GenerateConeccion";

export const getUsers = ({ onCallBackData=()=>{}, onError=()=>{}}) => {
    getConsult(`${enlace}/listUsuarios`, { onCallBackData, onError })
};

export const setRegisterNewUser = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newUser`, { onCallBackData, onError, sendData})
};

export const getValidateUser = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/validateUser`, { onCallBackData, onError, sendData})
};

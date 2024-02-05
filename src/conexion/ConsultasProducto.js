import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult } from "./GenerateConeccion";

//CONTROL PRODUCTOS

export const subirNuevoModelo = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newModelo`, { onCallBackData, onError, sendData})
};

export const recuperarModelos = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    getConsult(`${enlace}/getModelos`, { onCallBackData, onError})
};

export const editarModelo = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/editModelo`, { onCallBackData, onError, sendData})
};

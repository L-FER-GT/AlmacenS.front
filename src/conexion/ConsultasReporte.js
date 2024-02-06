
import { enlace } from "./Enlace";
import { postConsult } from "./GenerateConeccion";

//CONTROL PRODUCTOS

export const top10Productos = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/topProductosMasVendidos`, { onCallBackData, onError, sendData})
};

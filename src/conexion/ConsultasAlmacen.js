import { enlace } from "./Enlace";
//import { getConsult } from "./GenerateConeccion";
import { postConsult } from "./GenerateConeccion";

//CONTROL ALMACENES

export const subirNuevoAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newAlmacen`, { onCallBackData, onError, sendData})
};
export const newConectionAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newEmpleadoAlmacen`, { onCallBackData, onError, sendData})
};

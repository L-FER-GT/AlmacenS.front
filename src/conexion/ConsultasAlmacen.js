import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult } from "./GenerateConeccion";

//CONTROL ALMACENES

export const subirNuevoAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newAlmacen`, { onCallBackData, onError, sendData})
};
export const newConectionAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/newEmpleadoAlmacen`, { onCallBackData, onError, sendData})
};

export const recuperarAlmecenes = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    getConsult(`${enlace}/getAlmacenes`, { onCallBackData, onError})
};

export const recuperarConexionesAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    getConsult(`${enlace}/getAlmacenesEmpleado`, { onCallBackData, onError})
};
export const editarAlmacen = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/editAlmacen`, { onCallBackData, onError, sendData})
};

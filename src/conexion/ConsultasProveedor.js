import { enlace } from "./Enlace";
import { getConsult } from "./GenerateConeccion";
import { postConsult, postImage } from "./GenerateConeccion";

export const getImages = ({ onCallBackData=()=>{}, onError=()=>{}}) => {
    getConsult(`${enlace}/getIdNamesImage`, { onCallBackData, onError })
};

export const setImageUpdate = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postImage(`${enlace}/newImage`, { onCallBackData, onError, sendData})
};


export const getImageByID = ({ onCallBackData=()=>{}, onError=()=>{}, sendData=''}) => {
    postConsult(`${enlace}/getImageById`, { onCallBackData, onError, sendData})
};

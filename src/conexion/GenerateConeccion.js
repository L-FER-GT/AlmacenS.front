import axios from "axios";

export const getConsult = (enlace,{ onCallData, onError }) => {
    axios
      .get(enlace)
      .then((response) => {
        onCallData(response.data);
      })
      .catch((error) => {
        onError(error, '');
      });
  };

export const setConsult = (enlace,{ onCallData, onError, sendData}) => {
    axios
      .post(enlace, sendData)
      .then((response) => {
        onCallData(response);
      })
      .catch((error) => {
          onError(error);
      });
  };
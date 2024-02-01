import axios from "axios";

export const getConsult = (enlace, { onCallBackData, onError, sendData }) => {
  axios
    .get(enlace, sendData)
    .then((response) => {
        onCallBackData(response.data);
    })
    .catch((error) => {
      onError(error, "");
    });
};

export const postConsult = (enlace, { onCallBackData, onError, sendData }) => {
  axios
    .post(enlace, sendData)
    .then((response) => {
        onCallBackData(response.data);
    })
    .catch((error) => {
      onError(error, "");
    });
};

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
//COMPONENTS
import ImageUploader from "../components/imageUploader";
//QUERIES
import { setImageUpdate } from "../../conexion/ConsultasProveedor";
const ImageUploadDialog = ({ open, onClose }) => {
  const [nombreImagen, setNombreImagen] = useState("");
  const [subidoConExito, setSubidoConExito] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubirClick = () => {
    setLoading(true);
    setImageUpdate({
      sendData: { nombre: nombreImagen, image: image },
      onCallBackData: (data) => {
        setLoading(false);
        setSubidoConExito(true);
        setNombreImagen("");
        setImage(null)
      },
      onError: (err) => {
        setLoading(false);
        console.error(err);
      },
    });
  };

  const handleClose = () => {
    // Resetear los estados al cerrar el diálogo
    setNombreImagen("");
    setSubidoConExito(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>Subir Imagen</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid container item xs={12} sm={6} alignItems={"center"}>
            <Grid container item xs={12} justifyContent={"center"}>
              <TextField
                label="Nombre Imagen"
                fullWidth
                value={nombreImagen}
                onChange={(e) => setNombreImagen(e.target.value)}
              />
              <Grid item xs={12} style={{ height: "10px" }} />
              <Button
                variant="contained"
                onClick={handleSubirClick}
                disabled={loading}
              >
                {loading ? <CircularProgress size={20} /> : "Subir"}
              </Button>
            </Grid>

            {subidoConExito && (
              <Alert
                severity="success"
                onClose={() => setSubidoConExito(false)}
              >
                Subido con éxito
              </Alert>
            )}
          </Grid>
          <Grid container item xs={12} sm={6}>
            <ImageUploader image={image} onHandleChangeImage={setImage} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadDialog;

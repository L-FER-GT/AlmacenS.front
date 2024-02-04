import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Grid } from "@mui/material";

const ImageUploader = ({image,onHandleChangeImage}) => {

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      console.log("Archivos rechazados:", rejectedFiles);
      // Puedes mostrar un mensaje de error al usuario indicando que solo se aceptan imágenes.
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      const image = acceptedFiles[0];
      if (image.type && image.type.startsWith("image/")) {
        onHandleChangeImage(image);
      } else {
        console.error("El archivo no es una imagen válida.");
        // Puedes mostrar un mensaje de error al usuario indicando que solo se aceptan imágenes.
      }
    }
  }, []);

  const clearImage = () => {
    onHandleChangeImage(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
  });

  return (
    <div>
      {!Boolean(image) && (
        <Grid container>
          <Grid
            item
            container
            xs={12}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <div
              {...getRootProps()}
              style={isDragActive ? dropzoneActiveStyle : dropzoneStyle}
            >
                 <Grid item xs={12} style={{ height: "50px" }} />
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta la imagen aquí...</p>
              ) : (
                <p>
                  Arrastra y suelta una imagen aquí, o haz clic para
                  seleccionarla
                </p>
              )}
              <em>(Solo Imagenes *.jpeg, *.jpg, *.png seran aceptadas)</em>
            </div>
          </Grid>
        </Grid>
      )}

      {image && (
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="Imagen Seleccionada"
            style={{ maxWidth: "250px", maxHeight: "250px" }}
          />
          <Grid item xs={12} style={{ height: "10px" }} />
          <Button variant="contained" color="error" onClick={clearImage}>
            Quitar
          </Button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  position: "relative",
  height: "300px",
  width: "300px",
};

const dropzoneActiveStyle = {
  ...dropzoneStyle,
  backgroundColor: "#e6ffe6", // Cambiar a un tono de verde claro
};

const imageContainerStyle = {
  position: "relative",
};

const deleteButtonStyle = {
  position: "absolute",
  top: 0,
  right: 0,
};

export default ImageUploader;

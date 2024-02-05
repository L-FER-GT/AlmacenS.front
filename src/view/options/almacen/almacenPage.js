import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  Alert,
  Grid,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
//COMPONENTES
import ImageView from "../../components/imageView";
import ImageUploadDialog from "../../dialogs/dialogNewImage";
import DialogConfirmAccess from "../../dialogs/dialogConfirmAcces";
//QUERIES
import { getImageByID } from "../../../conexion/ConsultasProveedor";
import { subirNuevoAlmacen } from "../../../conexion/ConsultasAlmacen";
import { newConectionAlmacen } from "../../../conexion/ConsultasAlmacen";
import { getImagesType } from "../../../conexion/ConsultasProveedor";
import { recuperarAlmecenes } from "../../../conexion/ConsultasAlmacen";
import { recuperarConexionesAlmacen } from "../../../conexion/ConsultasAlmacen";
import { editarAlmacen } from "../../../conexion/ConsultasAlmacen";
//TIPO DE IMAGEN
const tipoImagen = "LOCAL";
//------------------------------MAIN--------------------------//
const AlmacenPage = ({ idUser }) => {
  const [openNewImage, setOpenNewImage] = useState(false);
  const [dataImage, setDataImage] = useState(null);
  const [listImage, setListImage] = useState([]);
  const [accesKey, setAccesKey] = useState("");
  const [listaAlmacenes, setListaAlmacenes] = useState([]);
  const [listaConecciones, setListaConecciones] = useState([]);
  const [listaAlmacenesAsignados, setListaAlmacenesAsignados] = useState([]);
  const [listaAlmacenesNoAsignados, setListaAlmacenesNoAsignados] = useState(
    []
  );

  const [subidoConExito, setSubidoConExito] = useState(false);
  const [almacenInfo, setAlmacenInfo] = useState({
    Referencia: "",
    Pais: "",
    Departamento: "",
    Provincia: "",
    Distrito: "",
    Direccion: "",
    Capacidad: "",
    foto: "",
  });
  function cargarListaAlmacenes() {
    recuperarAlmecenes({
      onCallBackData: (data) => {
        setListaAlmacenes(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
  function cargarListaImagenes() {
    getImagesType({
      onCallBackData: (data) => {
        setListImage(data);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: { tipo: tipoImagen },
    });
  }
  function cargarListaConexiones() {
    recuperarConexionesAlmacen({
      onCallBackData: (data) => {
        const arrayFiltrado = data.filter(
          (objeto) => objeto.ID_Empleado === idUser
        );

        const arrayDeIDAlmacen = arrayFiltrado.map(
          (objeto) => objeto.ID_Almacen
        );

        setListaConecciones(arrayDeIDAlmacen);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
  function determinarAlmacenesAsignadosYnoAsignados() {
    const arrayAsignados = listaAlmacenes.filter((objeto) =>
      listaConecciones.includes(objeto.ID_Almacen)
    );
    const arrayNoAsignados = listaAlmacenes.filter(
      (objeto) => !listaConecciones.includes(objeto.ID_Almacen)
    );
    setListaAlmacenesAsignados(arrayAsignados);
    setListaAlmacenesNoAsignados(arrayNoAsignados);
  }
  useEffect(() => {
    cargarListaImagenes();
    cargarListaAlmacenes();
    cargarListaConexiones();
  }, []);
  useEffect(() => {
    determinarAlmacenesAsignadosYnoAsignados();
  }, [listaConecciones, listaAlmacenes]);
  const handleChange = (e) => {
    setAlmacenInfo({
      ...almacenInfo,
      [e.target.name]: e.target.value,
    });
  };

  function seleccionarImagen(e) {
    handleChange(e);
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: e.target.value },
    });
  }

  function agregarConeccion(idUsuario, idAlmacen) {
    newConectionAlmacen({
      sendData: { ID_Empleado: idUsuario, ID_Almacen: idAlmacen },
      onCallBackData: () => {
        limpiarAlmacen();
        cargarListaAlmacenes();
        cargarListaConexiones();
        setSubidoConExito(true);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }
  function limpiarAlmacen() {
    setAlmacenInfo({
      Referencia: "",
      Pais: "",
      Departamento: "",
      Provincia: "",
      Distrito: "",
      Direccion: "",
      Capacidad: "",
      foto: "",
    });
    setAlmacenSelected_1("");
    setAlmacenSelected_2("");
    setAccesKey("");
    setDataImage(null);
  }
  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para enviar los datos del proveedor al backend
    subirNuevoAlmacen({
      onCallBackData: (data) => {
        limpiarAlmacen();
        setSubidoConExito(true);
        agregarConeccion(idUser, data.id);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: {
        Referencia: almacenInfo.Referencia,
        Pais: almacenInfo.Pais,
        Departamento: almacenInfo.Departamento,
        Provincia: almacenInfo.Provincia,
        Distrito: almacenInfo.Distrito,
        Direccion: almacenInfo.Direccion,
        Capacidad: almacenInfo.Capacidad,
        Capacidad_Utilizada: 0,
        Imagen_Referencial: almacenInfo.foto,
      },
    });
    // También puedes reiniciar los campos después de enviar los datos
  };
  //Control radio
  const [selectedValue, setSelectedValue] = useState("crear"); // Estado para almacenar el valor seleccionado

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };
  //CONTROL ALMACEN SELECCIONADO
  const [almacenSelected_1, setAlmacenSelected_1] = useState("");
  const [almacenSelected_2, setAlmacenSelected_2] = useState("");

  function seleccionarAlmacen_1(e) {
    setAlmacenSelected_1(e.target.value);

    const almacenEncontrado = listaAlmacenes.filter(
      (almacen) => almacen.ID_Almacen === e.target.value
    );
    const almacenActual = almacenEncontrado[0];
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: almacenActual.Imagen_Referencial },
    });
    setAlmacenInfo({
      Referencia: almacenActual.Referencia,
      Pais: almacenActual.Pais,
      Departamento: almacenActual.Departamento,
      Provincia: almacenActual.Provincia,
      Distrito: almacenActual.Distrito,
      Direccion: almacenActual.Direccion,
      Capacidad: almacenActual.Capacidad,
      foto: almacenActual.Imagen_Referencial,
    });
    setAccesKey(almacenActual.AccesKey);
  }
  function seleccionarAlmacen_2(e) {
    setAlmacenSelected_2(e.target.value);

    const almacenEncontrado = listaAlmacenes.filter(
      (almacen) => almacen.ID_Almacen === e.target.value
    );
    const almacenActual = almacenEncontrado[0];
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: almacenActual.Imagen_Referencial },
    });
    setAlmacenInfo({
      Referencia: almacenActual.Referencia,
      Pais: almacenActual.Pais,
      Departamento: almacenActual.Departamento,
      Provincia: almacenActual.Provincia,
      Distrito: almacenActual.Distrito,
      Direccion: almacenActual.Direccion,
      Capacidad: almacenActual.Capacidad,
      foto: almacenActual.Imagen_Referencial,
    });
    setAccesKey(almacenActual.AccesKey);
  }
  useEffect(() => {
    limpiarAlmacen();
  }, [selectedValue]);

  function onModificarAlmacen() {
    if (almacenSelected_1 !== "") {
      editarAlmacen({
        sendData: {
          ID_Almacen: almacenSelected_1,
          Referencia: almacenInfo.Referencia,
          Pais: almacenInfo.Pais,
          Departamento: almacenInfo.Departamento,
          Provincia: almacenInfo.Provincia,
          Distrito: almacenInfo.Distrito,
          Direccion: almacenInfo.Direccion,
          Capacidad: almacenInfo.Capacidad,
          Capacidad_Utilizada: 0,
          Imagen_Referencial: almacenInfo.foto,
        },
        onCallBackData: () => {
          cargarListaAlmacenes();
          limpiarAlmacen();
          setSubidoConExito(true);
        },
        onError: (err) => {
          console.error(err);
        },
      });
    }
  }
  //CONTROL CONFIRM
  const [openConfirmAccess, setOpenConfirmAccess] = useState(false);
  return (
    <Box p={3}>
      <ImageUploadDialog
        tipoImagen={tipoImagen}
        open={openNewImage}
        onClose={() => {
          cargarListaImagenes();
          setOpenNewImage(false);
        }}
      />
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container justifyContent={"center"} spacing={2}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              CONTROL ALMACEN
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedValue} // Asigna el valor seleccionado al RadioGroup
              onChange={handleRadioChange} // Maneja el cambio de selección
            >
              <FormControlLabel
                value="crear"
                control={<Radio />}
                label="Nuevo Almacen"
              />
              <FormControlLabel
                value="asignar"
                control={<Radio />}
                label="Asignar Almacen"
              />
              <FormControlLabel
                value="editar"
                control={<Radio />}
                label="Editar Almacenes"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container>
          <Grid item container xs={6} justifyContent={"center"}>
            <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px" }}>
              {selectedValue === "editar" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Seleccionar Almacen</InputLabel>
                  <Select
                    name="almacen"
                    value={almacenSelected_1}
                    onChange={seleccionarAlmacen_1}
                  >
                    {listaAlmacenesAsignados.map((item) => (
                      <MenuItem key={item.ID_Almacen} value={item.ID_Almacen}>
                        {item.Referencia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {selectedValue === "asignar" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Seleccionar Almacen</InputLabel>
                  <Select
                    name="almacen"
                    value={almacenSelected_2}
                    onChange={seleccionarAlmacen_2}
                  >
                    {listaAlmacenesNoAsignados.map((item) => (
                      <MenuItem key={item.ID_Almacen} value={item.ID_Almacen}>
                        {item.Referencia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {selectedValue !== "asignar" && (
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Descripción/Referencia"
                  name="Referencia"
                  value={almacenInfo.Referencia}
                  onChange={handleChange}
                  disabled={selectedValue === "asignar"}
                />
              )}
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="País"
                name="Pais"
                value={almacenInfo.Pais}
                onChange={handleChange}
                disabled={selectedValue === "asignar"}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Departamento"
                name="Departamento"
                value={almacenInfo.Departamento}
                onChange={handleChange}
                disabled={selectedValue === "asignar"}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Provincia"
                name="Provincia"
                value={almacenInfo.Provincia}
                onChange={handleChange}
                disabled={selectedValue === "asignar"}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Distrito"
                name="Distrito"
                value={almacenInfo.Distrito}
                onChange={handleChange}
                disabled={selectedValue === "asignar"}
              />
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Dirección"
                name="Direccion"
                value={almacenInfo.Direccion}
                onChange={handleChange}
                disabled={selectedValue === "asignar"}
              />
              {selectedValue !== "asignar" && (
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Capacidad"
                  type="number"
                  name="Capacidad"
                  value={almacenInfo.Capacidad}
                  onChange={handleChange}
                />
              )}
              {selectedValue !== "asignar" && (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Foto del Lugar</InputLabel>
                  <Select
                    name="foto"
                    value={almacenInfo.foto}
                    onChange={seleccionarImagen}
                  >
                    {listImage.map((item) => (
                      <MenuItem key={item.ID_Image} value={item.ID_Image}>
                        {item.Nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              {selectedValue === "editar" && (
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="llave de Acceso"
                  name="accesKey"
                  value={accesKey}
                  onChange={() => {}}
                  disabled
                />
              )}
              {selectedValue === "crear" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Agregar Almacen
                </Button>
              )}
              {selectedValue === "asignar" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenConfirmAccess(true);
                  }}
                >
                  Asignar Almacen
                </Button>
              )}
              {selectedValue === "editar" && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onModificarAlmacen}
                >
                  Editar Almacen
                </Button>
              )}

              {subidoConExito && (
                <Alert
                  severity="success"
                  onClose={() => setSubidoConExito(false)}
                >
                  Subido con éxito
                </Alert>
              )}
            </Paper>
          </Grid>
          <Grid container item xs={6} justifyContent={"center"}>
            <ImageView
              imageData={dataImage}
              height={"400px"}
              width={"400px"}
            ></ImageView>
            <Grid item xs={12} style={{ height: "10px" }} />
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setOpenNewImage(true);
                }}
              >
                Nueva Imagen
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <DialogConfirmAccess
        open={openConfirmAccess}
        handleClose={() => {
          setOpenConfirmAccess(false);
        }}
        accessCode={accesKey}
        onHandleCorrect={() => {
          if (almacenSelected_2 !== "") {
            agregarConeccion(idUser, almacenSelected_2);
          }
        }}
      />
    </Box>
  );
};

export default AlmacenPage;

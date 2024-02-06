import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  Grid,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//MUI DATA TABLE
import MUIDataTable from "mui-datatables";
//COMPONENTES
import ImageView from "../../components/imageView";
import useConfigColumns from "./configColumn";
//QUERIES
import { recuperarAlmecenes } from "../../../conexion/ConsultasAlmacen";
import { recuperarModelos } from "../../../conexion/ConsultasProducto";
import { getImageByID } from "../../../conexion/ConsultasProveedor";
import { agregarProductos } from "../../../conexion/ConsultasProducto";
import { recuperarConexionesAlmacen } from "../../../conexion/ConsultasAlmacen";
//-------------------MAIN--------------------------//
const AgregarProductosPage = ({idUser}) => {
  const [dataImage, setDataImage] = useState(null);
  const [cantProduct, setCantProduct] = useState(0);
  const [fechaSelect, setFechaSelec] = useState(dayjs());
  const [calzado, setCalzado] = useState({
    ID_Producto: "",
    Inventario_Asociado: "",
    FechaIngreso: new Date(),
    Observaciones: "",
    Color: "",
    Talla: "",
    Precio: 0.0,
  });
  const handleCalzadoChange = (e) => {
    setCalzado({
      ...calzado,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (e) => {
    setFechaSelec(e);
    const fechaDate = e.toDate();
    setCalzado({
      ...calzado,
      FechaIngreso: fechaDate,
    });
  };
  //------CONTROL EXISTENCIA------//
  const [listaModelos, setListaModelos] = useState([]);
  const [listaAlmacenes, setListaAlmacenes] = useState([]);
  const [listaConecciones, setListaConecciones] = useState([]);
  const [listaAlmacenesAsignados, setListaAlmacenesAsignados] = useState([]);
  const [almacenSelected, setAlmacenSelected] = useState("");
  const [modeloSelected, setModeloSelected] = useState("");

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

  function cargarListaModelos() {
    recuperarModelos({
      onCallBackData: (data) => {
        setListaModelos(data);
      },
      onError: (err) => {
        console.error(err);
      },
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
  function determinarAlmacenesAsignados() {
    const arrayAsignados = listaAlmacenes.filter((objeto) =>
      listaConecciones.includes(objeto.ID_Almacen)
    );
    setListaAlmacenesAsignados(arrayAsignados);
  }
  function seleccionarModelo(e) {
    setModeloSelected(e.target.value);
    handleCalzadoChange(e);
    const modelosEncontrado = listaModelos.filter(
      (modelo) => modelo.ID_Producto === e.target.value
    );
    const modeloActual = modelosEncontrado[0];
    getImageByID({
      onCallBackData: (data) => {
        setDataImage(data);
      },
      sendData: { id: modeloActual.Imagen_Asociada },
    });
  }
  function seleccionarAlmacen(e) {
    handleCalzadoChange(e);
    setAlmacenSelected(e.target.value);
  }
  useEffect(() => {
    cargarListaAlmacenes();
    cargarListaModelos();
    cargarListaConexiones();
  }, []);
  useEffect(() => {
    if (listaConecciones.length > 0) {
      determinarAlmacenesAsignados();
    }
  }, [listaConecciones]);
  //CONTROL DE TABLA
  const options = {
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    selectableRows: "none",
    elevation: 5,
    textLabels: {
      body: {
        noMatch: "No hay datos en la tabla (Agregue datos)",
      },
      pagination: {
        rowsPerPage: "Mostrar",
      },
    },
  };
  const [dataTabla, setDataTabla] = useState([]);
  const estadoView = [
    { name: "ID_Producto", label: "ID Producto" },
    { name: "Inventario_Asociado", label: "Inventario Asociado" },
    { name: "Observaciones", label: "Observaciones" },
    { name: "Color", label: "Color" },
    { name: "Talla", label: "Talla" },
    { name: "Precio", label: "Precio" },
  ];

  function agregarElementoTable() {
    let prevDataTabla = dataTabla;
    for (let i = 0; i < cantProduct; i++) {
      let auxElement = { ...calzado };
      prevDataTabla.push(auxElement);
    }
    setDataTabla([...prevDataTabla]);
  }

  const handleDelete = (index) => {
    // Crea una nueva copia del array dataTabla sin el elemento en el índice dado
    const newDataTabla = [
      ...dataTabla.slice(0, index),
      ...dataTabla.slice(index + 1),
    ];
    setDataTabla([...newDataTabla]);
  };
  const columns = useConfigColumns({
    estadoView: estadoView,
    deleteFila: handleDelete,
    dataTabla: dataTabla,
  });
  //------CONTROL SUBIDA DE DATOS--------------//
  function subirCalzados() {
    const intermediarioData = [...dataTabla];
    for (let i = 0; i < dataTabla.length; i++) {
      agregarProductos({
        onCallBackData: (data) => {},
        sendData: intermediarioData[i],
        onError: (err) => {
          console.error(err);
        },
      });
    }
    setDataTabla([]);
  }
  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container>
          <Grid item container xs={10}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Seleccionar Almacen</InputLabel>
                  <Select
                    name="Inventario_Asociado"
                    value={almacenSelected}
                    onChange={seleccionarAlmacen}
                  >
                    {listaAlmacenesAsignados.map((item) => (
                      <MenuItem key={item.ID_Almacen} value={item.ID_Almacen}>
                        {item.Referencia}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Seleccionar Modelos</InputLabel>
                  <Select
                    name="ID_Producto"
                    value={modeloSelected}
                    onChange={seleccionarModelo}
                  >
                    {listaModelos.map((item) => (
                      <MenuItem key={item.ID_Producto} value={item.ID_Producto}>
                        {item.Nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2} />
              <Grid item container xs={3} justifyContent={"flex-end"}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker", "DatePicker"]}>
                    <DatePicker
                      label="Fecha de ingreso"
                      margin="dense"
                      size="small"
                      fullWidth
                      format="DD/MM/YYYY"
                      name="FechaIngreso"
                      value={fechaSelect}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    label="Color"
                    name="Color"
                    value={calzado.Color}
                    onChange={handleCalzadoChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    label="Talla"
                    type="number"
                    name="Talla"
                    value={calzado.Talla}
                    onChange={handleCalzadoChange}
                  />
                </Grid>
              </Grid>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    type="number"
                    label="Precio"
                    name="Precio"
                    value={calzado.Precio}
                    onChange={handleCalzadoChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    size="small"
                    fullWidth
                    label="Cantidad"
                    type="number"
                    name="cantidad"
                    value={cantProduct}
                    onChange={(e) => {
                      setCantProduct(e.target.value);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            {/* Segunda mitad */}
            <Grid item container xs={8} justifyContent={"center"}>
              <Grid item container xs={11} justifyContent={"center"}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  label="Observaciones"
                  name="Observaciones"
                  value={calzado.Observaciones}
                  onChange={handleCalzadoChange}
                />
              </Grid>

              <Button variant="contained" onClick={agregarElementoTable}>
                Agregar
              </Button>
            </Grid>
          </Grid>
          <Grid item container xs={2}>
            <ImageView
              imageData={dataImage}
              height={"150px"}
              width={"150px"}
              text=""
            />
          </Grid>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12} style={{ height: "20px" }} />
          <Grid container spacing={5}>
            <Grid item xs={10}>
              <MUIDataTable
                data={dataTabla}
                columns={columns}
                options={options}
                // className={classes.muiPadding}
              />
            </Grid>
            <Grid item container xs={2} alignContent={"center"}>
              <Button
                variant="contained"
                onClick={subirCalzados}
                style={{ height: "100px" }}
              >
                Subir
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AgregarProductosPage;

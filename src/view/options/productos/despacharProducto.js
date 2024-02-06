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
import useConfigColumnsDes from "./configColumnDes";
//QUERIES
import { recuperarAlmecenes } from "../../../conexion/ConsultasAlmacen";
import { recuperarModelos } from "../../../conexion/ConsultasProducto";
import { getImageByID } from "../../../conexion/ConsultasProveedor";
import { agregarProductos } from "../../../conexion/ConsultasProducto";
import { consultarProductoPorInventario } from "../../../conexion/ConsultasProducto";
import { obtenerImageByIdModel } from "../../../conexion/ConsultasProducto";
import { updateDisponibilidadProducto } from "../../../conexion/ConsultasProducto";
import { recuperarConexionesAlmacen } from "../../../conexion/ConsultasAlmacen";
//-------------------MAIN--------------------------//
const DespacharProductosPage = ({ idUser }) => {
  const [dataImage, setDataImage] = useState(null);

  //------CONTROL EXISTENCIA------//
  const [listaAlmacenes, setListaAlmacenes] = useState([]);
  const [almacenSelected, setAlmacenSelected] = useState("");
  const [dataTablaAlmacen, setDataTablaAlmacen] = useState([]);
  const [dataTablaDespachar, setDataTablaDespachar] = useState([]);
  const [listaConecciones, setListaConecciones] = useState([]);
  const [listaAlmacenesAsignados, setListaAlmacenesAsignados] = useState([]);
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
  useEffect(() => {
    if (listaConecciones.length > 0) {
      determinarAlmacenesAsignados();
    }
  }, [listaConecciones]);
  function seleccionarAlmacen(e) {
    setAlmacenSelected(e.target.value);
    setDataTablaDespachar([]);
    consultarProductoPorInventario({
      onCallBackData: (data) => {
        const intermediario = data.map((objeto) => {
          return {
            ...objeto,
            FechaIngreso: new Date(objeto.FechaIngreso),
            FechaSalida: new Date(objeto.FechaSalida),
          };
        });
        setDataTablaAlmacen(intermediario);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: { Inventario_Asociado: e.target.value },
    });
  }
  useEffect(() => {
    cargarListaAlmacenes();
    cargarListaConexiones();
  }, []);
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
  const optionsAlmacen = {
    download: false,
    filter: false,
    print: false,
    viewColumns: false,
    search: false,
    selectableRows: "none",
    elevation: 5,
    textLabels: {
      body: {
        noMatch: "No hay datos en la tabla (Selecciones un Alamcen)",
      },
      pagination: {
        rowsPerPage: "Mostrar",
      },
    },
  };
  const estadoView = [
    { name: "ID_Producto", label: "ID Producto" },
    { name: "Observaciones", label: "Observaciones" },
    { name: "Color", label: "Color" },
    { name: "Talla", label: "Talla" },
    { name: "Precio", label: "Precio" },
  ];

  const moverElementoDespachar = (index) => {
    if (index >= 0 && index < dataTablaAlmacen.length) {
      const elementoMovido = dataTablaAlmacen.splice(index, 1)[0];
      setDataTablaDespachar((prevDespachar) => [
        ...prevDespachar,
        elementoMovido,
      ]);
      setDataTablaAlmacen([...dataTablaAlmacen]);
    }
  };
  const deleteElementoDespachar = (index) => {
    if (index >= 0 && index < dataTablaDespachar.length) {
      const elementoMovido = dataTablaDespachar.splice(index, 1)[0];
      setDataTablaAlmacen((prev) => [...prev, elementoMovido]);
      setDataTablaDespachar([...dataTablaDespachar]);
    }
  };
  const viewElement = (index) => {
    if (index >= 0 && index < dataTablaAlmacen.length) {
      const elementoSeleccionado = dataTablaAlmacen[index];
      obtenerImageByIdModel({
        onCallBackData: (data) => {
          setDataImage(data.Image);
        },
        onError: (err) => {
          console.error(err);
        },
        sendData: { idProducto: elementoSeleccionado.ID_Producto },
      });
    }
  };
  const columns = useConfigColumns({
    estadoView: estadoView,
    deleteFila: deleteElementoDespachar,
    dataTabla: dataTablaAlmacen,
  });
  const columnsAlmacen = useConfigColumnsDes({
    estadoView: estadoView,
    addFila: moverElementoDespachar,
    viewFila: viewElement,
    dataTabla: dataTablaAlmacen,
  });

  //------CONTROL SUBIDA DE DATOS--------------//
  function handleClickDespachar() {
    const intermediarioData = [...dataTablaDespachar];
    for (let i = 0; i < intermediarioData.length; i++) {
      updateDisponibilidadProducto({
        onError: (err) => {
          console.error(err);
        },
        sendData: { Cod_par: intermediarioData[i].Cod_par },
      });
    }
    setDataTablaDespachar([]);
  }
  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container>
          <Grid item container xs={9}>
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
            </Grid>

            <Grid item xs={12}>
              <MUIDataTable
                data={dataTablaAlmacen}
                columns={columnsAlmacen}
                options={optionsAlmacen}
              />
            </Grid>
          </Grid>
          <Grid item container xs={3} justifyContent={"flex-end"}>
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
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Despachar Productos
          </h2>
          <Grid item xs={12} style={{ height: "20px" }} />
          <Grid container spacing={5}>
            <Grid item xs={10}>
              <MUIDataTable
                data={dataTablaDespachar}
                columns={columns}
                options={options}
                // className={classes.muiPadding}
              />
            </Grid>
            <Grid item container xs={2} alignContent={"center"}>
              <Button
                variant="contained"
                onClick={handleClickDespachar}
                style={{ height: "100px" }}
              >
                Despachar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DespacharProductosPage;

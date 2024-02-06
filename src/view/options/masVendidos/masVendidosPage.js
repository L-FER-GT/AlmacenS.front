import React, { useEffect, useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import { MonthCalendar } from "@mui/x-date-pickers/MonthCalendar";
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
import { top10Productos } from "../../../conexion/ConsultasReporte";
import { obtenerImageByIdModel } from "../../../conexion/ConsultasProducto";
//TIPO DE IMAGEN
const tipoImagen = "LOCAL";
//------------------------------MAIN--------------------------//
const MasVendidosPage = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(1);
  const currentYear = new Date().getFullYear();
  const [newConfig, setNewConfig] = useState(false);
  const years = Array.from({ length: 50 }, (_, index) => currentYear - index);
  const [dataTop, setDataTop] = useState([]);
  const months = [
    { value: 1, label: "Enero" },
    { value: 2, label: "Febrero" },
    { value: 3, label: "Marzo" },
    { value: 4, label: "Abril" },
    { value: 5, label: "Mayo" },
    { value: 6, label: "Junio" },
    { value: 7, label: "Julio" },
    { value: 8, label: "Agosto" },
    { value: 9, label: "Septiembre" },
    { value: 10, label: "Octubre" },
    { value: 11, label: "Noviembre" },
    { value: 12, label: "Diciembre" },
  ];
  function consultarTop() {
    console.log(selectedYear);
    console.log(selectedMonth);
    top10Productos({
      onCallBackData: (data) => {
        let intemedio = [...data];
        for (let i = 0; i < intemedio.length; i++) {
          intemedio[i].Imagen = null;
        }
        setDataTop(intemedio);
        setNewConfig(true);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: { mes: selectedMonth, year: selectedYear },
    });
  }
  function obtenerImage(ID, index) {
    obtenerImageByIdModel({
      onCallBackData: (data) => {
        let auxCopyData = dataTop;
        auxCopyData[index].Imagen = data.Image;
        setDataTop([...auxCopyData]);
      },
      onError: (err) => {
        console.error(err);
      },
      sendData: { idProducto: ID },
    });
  }
  useEffect(() => {
    if (newConfig) {
      console.log(dataTop);
      for (let i = 0; i < dataTop.length; i++) {
        obtenerImage(dataTop[i].ID_Producto, i);
      }
      setNewConfig(false);
    }
  }, [newConfig]);
  return (
    <Box p={3}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid container>
          <Grid item container xs={4} spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Selecciona un mes</InputLabel>
                <Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  {months.map((month) => (
                    <MenuItem key={month.value} value={month.value}>
                      {month.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              {" "}
              <FormControl fullWidth margin="normal">
                <InputLabel>Selecciona un año</InputLabel>
                <Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container xs={8} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              size="small"
              style={{ height: "50px" }}
              onClick={consultarTop}
            >
              {" "}
              Consultar Mejores
            </Button>
          </Grid>
          <Grid item xs={12} style={{ height: "20px" }} />
          <Grid container spacing={2}>
            {dataTop.map((item) => {
              return (
                <Grid item container xs={4} justifyContent={"center"}>
                  <Paper elevation={5} style={{ padding: "10px" }}>
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Pedidos en el Mes {item.Ventas}
                  </h2>
                  <ImageView
                    key={item.ID_Producto}
                    imageData={item.Imagen}
                    height={"250px"}
                    width={"250px"}
                  />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default MasVendidosPage;

import React, { useMemo } from "react"; // Para utilizar React y useMemo
import IconButton from "@mui/material/IconButton"; // Para los botones de acciones
import VisibilityIcon from "@mui/icons-material/Visibility"; // Icono de ver detalle
import DeleteIcon from "@mui/icons-material/Delete";

function useConfigColumns({ estadoView, deleteFila, dataTabla }) {
  const columns = useMemo(() => {
    const configNormalColumn = estadoView.map((item) => {
      return {
        name: item.name,
        label: item.label,
        options: {
          filter: true,
          sort: false,
          display: true,
          // customBodyRender: (value, tableMeta) => {
          //    return (

          //    );
          // },
        },
      };
    });

    let configColumn = [
      {
        name: "FechaIngreso",
        label: "Fecha Ingreso",
        options: {
          filter: true,
          sort: false,
          display: true,
          customBodyRender: (value, tableMeta) => {
            const fecha = value; // Obtiene la fecha actual
            const dia = fecha.getDate().toString().padStart(2, "0"); // Obtiene el día y lo convierte a cadena, asegurándose de tener dos dígitos
            const mes = (fecha.getMonth() + 1).toString().padStart(2, "0"); // Obtiene el mes (los meses en JavaScript están basados en cero, por lo que sumamos 1), convierte a cadena y asegura dos dígitos
            const año = fecha.getFullYear(); // Obtiene el año

            const fechaFormateada = `${dia}/${mes}/${año}`;
            return <div>{fechaFormateada}</div>;
          },
        },
      },
    ];
    const resultColumns = configNormalColumn.concat(configColumn);
    return resultColumns.concat([
      {
        name: "Acciones",
        options: {
          filter: true,
          sort: false,
          viewColumns: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <div>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    {
                      deleteFila(tableMeta.rowIndex);
                    }
                  }}
                  title="Eliminar Fila"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          },
        },
      },
    ]);
  }, [estadoView, deleteFila, dataTabla]);
  return columns;
}

export default useConfigColumns;

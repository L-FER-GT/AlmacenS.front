import React, { useEffect, useState } from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { modifyDataUser } from "../../../conexion/ConsultasUsers";

const MyProfilePage = ({ dataUser, idUser }) => {
    
  const [form, setForm] = useState({
    DocumentoIdentidad: "",
    Nombres: "",
    Apellidos: "",
    Cargo: "",
    Contacto: "",
    User: "",
    Password: "",
    VerifPass: "",
  });
  const [formErrors, setFormErros] = useState({
    DocumentoIdentidad: "",
    Nombres: "",
    Apellidos: "",
    Cargo: "",
    Contacto: "",
    User: "",
    Password: "",
    VerifPass: "",
  });

  useEffect(() => {
    if (dataUser) {
      let auxPerfil = {};
      auxPerfil.User = dataUser.Usuario;
      auxPerfil.Apellidos = dataUser.Apellidos;
      auxPerfil.Cargo = dataUser.Cargo;
      auxPerfil.DocumentoIdentidad = dataUser.DocumentoIdentidad;
      auxPerfil.Contacto = dataUser.Informacion_Contacto;
      auxPerfil.Nombres = dataUser.Nombres;
      setForm({ ...form, ...auxPerfil });
    }
  }, [dataUser]);

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErros({ ...formErrors, [e.target.name]: "" });
  };
  const editUser = (e) => {
    let errors = {};
    let flagDataValida = true;
    if (form.Nombres === "") {
      errors.Nombres = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.Apellidos === "") {
      errors.Apellidos = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.DocumentoIdentidad === "") {
      errors.DocumentoIdentidad = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }

    if (flagDataValida) {
        const newValueUser={...form,idUser:idUser}
        modifyDataUser({sendData:newValueUser})
    } else {
      setFormErros({ ...formErrors, ...errors });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh", // Ajusta la altura según tus necesidades
      }}
    >
      <Grid container justifyContent={"center"} alignContent={"center"}>
        <Grid container item xs={4}>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Editar Cuenta
          </h2>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Nombres"
                name="Nombres"
                value={form.Nombres}
                error={formErrors.Nombres !== ""}
                helperText={formErrors.Nombres}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                label="Apellidos"
                name="Apellidos"
                value={form.Apellidos}
                error={formErrors.Apellidos !== ""}
                helperText={formErrors.Apellidos}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              label="Documento de Identidad"
              name="DocumentoIdentidad"
              value={form.DocumentoIdentidad}
              error={formErrors.DocumentoIdentidad !== ""}
              helperText={formErrors.DocumentoIdentidad}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              label="Telefono"
              name="Contacto"
              value={form.Contacto}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              label="Cargo en la Empresa"
              name="Cargo"
              value={form.Cargo}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              label="Usuario"
              name="User"
              value={form.User}
              error={formErrors.User !== ""}
              helperText={formErrors.User}
              onChange={handleInputChange}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} style={{ height: "20px" }} />

          <Grid item container xs={12} justifyContent={"center"}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={editUser}
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyProfilePage;

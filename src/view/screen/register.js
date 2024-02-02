import React, { useState } from "react";
import {
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import LoginImage from "../../assets/Login.png";

//querys
import { setRegisterNewUser } from "../../conexion/ConsultasUsers";

const RegisterUser = ({ onChangeScreen, users, onRefleshUser }) => {
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

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerif, setShowPasswordVerif] = useState(false);
  const [checkTerminos, setCheckTerminos] = useState(false);
  const [errorTerminos, setErrorTerminos] = useState(false);
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErros({ ...formErrors, [e.target.name]: "" });
  };

  const registerNewUser = (e) => {
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
    if (form.User === "") {
      errors.User = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.Password !== form.VerifPass) {
      errors.VerifPass = "Las contraseñas no coinciden";
      flagDataValida = false;
    }
    if (form.Password === "") {
      errors.Password = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (form.VerifPass === "") {
      errors.VerifPass = "Este campo no puede estar Vacio";
      flagDataValida = false;
    }
    if (!checkTerminos) {
      setErrorTerminos(true);
      flagDataValida = false;
    }
    if (users.includes(form.User)) {
      errors.User = "Usuario Existente, pruebe con otro";
      flagDataValida = false;
    }
    if (flagDataValida) {
      enviarRegistro();
    } else {
      setFormErros({ ...formErrors, ...errors });
    }
  };

  const enviarRegistro = () => {
    setRegisterNewUser({
      sendData: form,
      onCallBackData: (data) => {
        onRefleshUser();
        onChangeScreen("Login");
        setForm({
          DocumentoIdentidad: "",
          Nombres: "",
          Apellidos: "",
          Cargo: "",
          Contacto: "",
          User: "",
          Password: "",
          VerifPass: "",
        });
      },
      onError: (err) => {
        console.error(err);
      },
    });
  };

  return (
    <Grid container style={{ height: "100%", width: "100%" }}>
      <Grid
        container
        item
        xs={6}
        style={{ height: "700px", width: "100%" }}
        justifyContent={"center"}
      >
        <Grid
          container
          item
          xs={6}
          justifyContent={"center"}
          alignContent={"center"}
          style={{ minWidth: "300px" }}
        >
          <Paper elevation={0}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Registar Nueva Cuenta
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
                label="Usuario"
                name="User"
                value={form.User}
                error={formErrors.User !== ""}
                helperText={formErrors.User}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="Password"
                value={form.Password}
                error={formErrors.Password !== ""}
                helperText={formErrors.Password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Verificar contraseña"
                type={showPasswordVerif ? "text" : "password"}
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => {
                          setShowPasswordVerif(!showPasswordVerif);
                        }}
                        aria-label="toggle password visibility"
                      >
                        {showPasswordVerif ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                name="VerifPass"
                error={formErrors.VerifPass !== ""}
                helperText={formErrors.VerifPass}
                value={form.VerifPass}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} style={{ height: "20px" }} />
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkTerminos}
                    onChange={() => {
                      setCheckTerminos(!checkTerminos);
                      setErrorTerminos(false);
                    }}
                  />
                }
                label="Acepto los términos y condiciones"
              />
              {errorTerminos ? (
                <Typography variant="body2" color="error">
                  Por favor, acepta los términos y condiciones.
                </Typography>
              ) : null}
            </Grid>
            <Grid item container xs={12} justifyContent={"center"}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={registerNewUser} //registerUser
              >
                Registrar
              </Button>
            </Grid>
            <div>
              O ya tienes una cuenta, por favor{" "}
              <Link
                component="button"
                variant="body2"
                color="primary"
                onClick={() => {
                  onChangeScreen("Login");
                }}
                underline="none" // Elimina el subrayado
                sx={{
                  fontWeight: "normal", // Inicialmente establecido en normal
                  "&:hover": {
                    fontWeight: "bold", // Se pone en negrita al pasar el mouse sobre el enlace
                  },
                }}
              >
                Acceda ahora
              </Link>
              .
            </div>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={6} style={{ height: "100%", width: "100%" }}>
        <Box
          component="img"
          src={LoginImage}
          alt="Login"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterUser;

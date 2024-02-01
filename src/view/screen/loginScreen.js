import React, { useContext, useState } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import Link from "@mui/material/Link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";

import axios from "axios";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginImage from "../../assets/signup.jpg";

function Login({ onChangeScreen }) {
  const [form, setForm] = useState({
    User: "lucyFer",
    Password: "12345678",
  });
  const [formErrors, setFormErros] = useState({
    User: "",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErros({ ...formErrors, [e.target.name]: "" });
  };
  return (
    <Grid container style={{ height: "100%", width: "100%" }}>
      <Grid item xs={6} style={{ height: "100%", width: "100%" }}>
        <Box
          component="img"
          src={LoginImage}
          alt="Login"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Grid>
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
          xs={8}
          justifyContent={'center'}
          alignContent={"center"}
          style={{ width: "100%" }}
        >
          <Paper elevation={0} style={{width:'80%'}}>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Accede a tu Cuenta
            </h2>
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
            <Grid item xs={12} style={{ height: "20px" }} />
            <Grid container>
              <Grid container item xs={6} justifyContent={"flex-start"}>
                <FormControlLabel
                  control={<Checkbox onChange={() => {}} />}
                  label="Recordarme"
                />
              </Grid>
              <Grid item container xs={6} justifyContent={"flex-end"}>
                <Link
                  component="button"
                  variant="body2"
                  color="primary"
                  onClick={() => {
                    //onChangeScreen("NewUser");
                  }}
                  underline="none" // Elimina el subrayado
                  sx={{
                    fontWeight: "normal", // Inicialmente establecido en normal
                    "&:hover": {
                      fontWeight: "bold", // Se pone en negrita al pasar el mouse sobre el enlace
                    },
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent={"center"}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => {}} //registerUser
              >
                Registrar
              </Button>
            </Grid>
            <div>
              Si no tienes una cuenta,{" "}
              <Link
                component="button"
                variant="body2"
                color="primary"
                onClick={() => {
                  onChangeScreen("NewUser");
                }}
                underline="none" // Elimina el subrayado
                sx={{
                  fontWeight: "normal", // Inicialmente establecido en normal
                  "&:hover": {
                    fontWeight: "bold", // Se pone en negrita al pasar el mouse sobre el enlace
                  },
                }}
              >
                Registrece Aqui
              </Link>
              .
            </div>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;

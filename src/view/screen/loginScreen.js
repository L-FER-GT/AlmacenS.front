import React, { useContext, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

function Login() {
  const [form, setForm] = useState({
    user: "",
    password: "",
  });


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
        <div className="flex justify-center">
          <img src={require("../../assets/signup.jpg")} alt="" />
        </div>
        <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
          <div>
            <Typography variant="h4" align="center" gutterBottom>
              Accede a tu cuenta
            </Typography>
          </div>
          <form className="mt-8 space-y-6" onSubmit={()=>{}}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <TextField
                  id="user"
                  name="usuario"
                  type="text"
                  autoComplete="text"
                  required
                  fullWidth
                  label="Ingrese Usuario"
                  variant="outlined"
                  value={form.user}
                  onChange={()=>{}}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  fullWidth
                  label="Ingrese Contraseña"
                  variant="outlined"
                  value={form.password}
                  onChange={()=>{}}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      id="remember-me"
                      name="remember-me"
                      color="primary"
                    />
                  }
                  label="Recordarme"
                />
              </div>

              <div className="text-sm">
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={()=>{}}
              >
                Acceder
              </Button>
              <Typography variant="body2" align="center" className="mt-2">
                O no tiene una cuenta,{" "}
                <span className="font-medium text-indigo-600 hover:text-indigo-500">
                  {" "}
                </span>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

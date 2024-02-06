import React, { useState, useEffect } from "react";

//UI Material
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
//icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@mui/material";

import LogoGen from "../../assets/logoS.jpeg";
//Constantes
import { listaPaginas_1, listaPaginas_2 } from "../options/constantes";
//Componentes
import ListItemOption from "../components/listItemOption";
import Footer from "../components/footerview";
//Paginas
import WelcomePage from "../options/welcome/welcomePage";
import SettingsPage from "../options/settings/settingsPage";
import ProovedoresPage from "../options/proovedores/proovedoresPage";
import MyProfilePage from "../options/myProfile/myProfile";
import AlmacenPage from "../options/almacen/almacenPage";
import ModelosPage from "../options/modelos/modelosPage";
import DespacharProductosPage from "../options/productos/despacharProducto";
//QUERIES
import { getDataUser } from "../../conexion/ConsultasUsers";
import AgregarProductosPage from "../options/productos/agregarProductoPage";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//------------------------------------------------------------------------//
//-------------------------------MAIN-------------------------------------//
//------------------------------------------------------------------------//
export default function Home({ onChangeScreen, onRefleshUser, idUser }) {
  const [open, setOpen] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  useEffect(() => {
    if (idUser) {
      getDataUser({
        onCallBackData: (data) => {
          setDataUser(data);
        },
        sendData: { idUser: idUser },
      });
    }
  }, [idUser]);
  const handleChangeDrawer = () => {
    setOpen(!open);
  };

  //Control pagina
  const [selectedPage, setSelectedPage] = useState("Welcome");
  //Control menu Settings
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={false}
        sx={{ backgroundColor: "#fff" }}
        elevation={2}
      >
        <Toolbar>
          <Grid container>
            <Grid container item xs={6} justifyContent={"flex-start"}>
              <IconButton
                aria-label="open drawer"
                onClick={handleChangeDrawer}
                edge="start"
                sx={{
                  marginRight: 5,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component="img"
                src={LogoGen}
                alt="Spiaza"
                style={{ height: "35px", objectFit: "inherit" }}
              />
            </Grid>
            <Grid container item xs={6} justifyContent={"flex-end"}>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: "red", color: "white" }}>{"L"}</Avatar>
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    key={"itemMenuPerfil"}
                    onClick={() => {
                      setSelectedPage("MyProfile");
                    }}
                  >
                    <Typography textAlign="center">{"Perfil"}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    key={"itemMenuCerrarSesion"}
                    onClick={() => {
                      onChangeScreen("Login");
                    }}
                  >
                    <Typography textAlign="center">
                      {"Cerrar Sesion"}
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List key={"List_1"}>
          {listaPaginas_1.map((item, index) => (
            <ListItemOption
              key={item.value}
              text={item.text}
              Icon={item.icon}
              open={open}
              value={item.value}
              onHandleClick={(value) => {
                setSelectedPage(value);
              }}
            />
          ))}
        </List>
        <Divider />
        <List key={"List_2"}>
          {listaPaginas_2.map((item, index) => (
            <ListItemOption
              key={item.value}
              text={item.text}
              Icon={item.icon}
              open={open}
              value={item.value}
              onHandleClick={(value) => {
                setSelectedPage(value);
              }}
            />
          ))}
        </List>
      </Drawer>
      <Grid container>
        <Grid container item xs={12}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              backgroundColor: "#eee",
              minHeight: "500px",
            }}
          >
            <DrawerHeader />
            {/*Cambio de paginas */}
            {selectedPage === "Welcome" && <WelcomePage />}
            {selectedPage === "Proovedores" && <ProovedoresPage />}
            {selectedPage === "Settings" && <SettingsPage />}
            {selectedPage === "Modelos" && <ModelosPage />}
            {selectedPage === "AgregarProducto" && <AgregarProductosPage />}
            {selectedPage === "DespacharProductos" && <DespacharProductosPage />}
            {selectedPage === "Almacen" && <AlmacenPage idUser={idUser} />}
            {selectedPage === "MyProfile" && (
              <MyProfilePage dataUser={dataUser} idUser={idUser} />
            )}
            
          </Box>
        </Grid>
        <Grid container item xs={12} justifyContent={"center"}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}

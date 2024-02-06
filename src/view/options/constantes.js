//ICONOS
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import FactoryIcon from '@mui/icons-material/Factory';


export const listaPaginas_1 = [
  { value: "Welcome", text: "Inicio", icon: HomeIcon },
  {
    value: "AgregarProducto",
    text: "Agregar Productos",
    icon: AddCircleOutlineIcon,
  },
  {
    value: "DespacharProductos",
    text: "Despachar Productos",
    icon: LocalShippingIcon,
  },
  { value: "Modelos", text: "Crear Modelos", icon: ShoppingBagIcon },
  { value: "Proovedores", text: "Crear Provedores", icon: FactoryIcon },
  { value: "Almacen", text: "Control Almacenes", icon: WarehouseIcon },
];
export const listaPaginas_2 = [
  { value: "Settings", text: "Configuracion", icon: SettingsIcon },
];

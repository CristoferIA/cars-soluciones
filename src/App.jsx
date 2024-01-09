import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/page/Home";
import Login from "./components/page/Login";
import User from "./components/user/User";
import Page from "./components/page/Page";
import RecuperarPassword from "./components/page/RecuperarPassword";
import PrincipalProforma from "./components/user/proforma/PrincipalProforma";
import Cotizaciones from "./components/user/cotizaciones/Cotizaciones";
import Compartir from "./components/user/cotizaciones/compartir/Compartir";
import Whatsapp from "./components/user/cotizaciones/compartir/Whatsapp";
import Email from "./components/user/cotizaciones/compartir/Email";
import store from "./store";
import { Provider } from "react-redux";
import PricipalProductos from "./components/user/productos/PricipalProductos";
import NuevoProducto from "./components/user/productos/nuevo/NuevoProducto";
import BusquedaProducto from "./components/user/productos/BusquedaProducto";
import Salir from "./components/user/salir/Salir";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Page />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
        </Route>
      </Routes>
      <Provider store={store}>
        <Routes>
          <Route path="/user" element={<User />}>
            <Route path="/user/proforma" element={<PrincipalProforma />} />
            <Route path="/user/cotizaciones" element={<Cotizaciones />} />
            <Route element={<Compartir />}>
              <Route
                path="/user/cotizaciones/compartir/:id/whatsapp/:canal"
                element={<Whatsapp />}
              />
              <Route
                path="/user/cotizaciones/compartir/:id/email/:canal"
                element={<Email />}
              />
            </Route>
            <Route path="/user/productos" element={<PricipalProductos />}>
              <Route path="nuevo" element={<NuevoProducto />}></Route>
              <Route path="buscar" element={<BusquedaProducto />}></Route>
            </Route>
            <Route path="/user/salir" element={<Salir />} />
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;

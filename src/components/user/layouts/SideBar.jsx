import React, { useEffect } from "react";
import "../../../../public/css/user/layouts/sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const nombreMenu = useSelector((store) => store.nombreMenuSlice);

  useEffect(() => {
    const otros_items = document.querySelectorAll(".side-bar__option");
    otros_items.forEach((item) => {
      if (item.getAttribute("name") === nombreMenu) {
        console.log(item.getAttribute("name"));
        console.log(nombreMenu);
        item.classList.toggle("active-menu-sidebar");
      } else {
        item.classList.remove("active-menu-sidebar");
      }
    });
  }, [nombreMenu]);
  return (
    <div className="layout__side-bar">
      <section className="side-bar__container">
        <div className="side-bar__container-logo">
          <div className="side-bar__logo">
            <img src="../../../../public/images/logo.png" alt="" />
          </div>
        </div>
        <div>Sistems Cars Solutions</div>
        <div>
          <button> {">>"} </button>
        </div>
        <div>
          <ul>
            <li>
              <Link
                className="side-bar__option"
                name="proforma"
                to="/user/proforma"
              >
                Proforma
              </Link>
            </li>
            <li>
              <Link
                className="side-bar__option"
                name="cotizaciones"
                to="/user/cotizaciones"
              >
                Cotizaciones
              </Link>
            </li>
            <li>
              <Link
                className="side-bar__option"
                name="productos"
                to="/user/productos/buscar"
              >
                Productos
              </Link>
            </li>
            <li>
              <Link className="side-bar__option" to="">
                GanaciaFinal
              </Link>
            </li>
            <li>
              <Link className="side-bar__option" to="">
                Reportes
              </Link>
            </li>
            <li>
              <Link className="side-bar__option" to="/user/salir">
                Cerrar sesión
              </Link>
            </li>
            <ul></ul>
          </ul>
        </div>
      </section>
      <section>
        <div></div>
      </section>
    </div>
  );
};

export default SideBar;

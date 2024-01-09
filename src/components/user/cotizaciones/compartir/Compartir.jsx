import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import "../../../../../public/css/user/cotizaciones/compartir.css";
import { useDispatch } from "react-redux";
import { setNombreMenu } from "../../../../store/slices/nombreMenu.slice";

const Compartir = () => {
  const dispatch = useDispatch();
  dispatch(setNombreMenu("cotizaciones"));
  const { id, canal } = useParams();
  useEffect(() => {
    const menu_whatsapp = document.getElementById("menu-whatsapp");
    const menu_email = document.getElementById("menu-email");
    if (canal === "1") {
      menu_whatsapp.classList.add("compartir__menu-active");
      menu_email.classList.remove("compartir__menu-active");
    }
    if (canal === "2") {
      menu_whatsapp.classList.remove("compartir__menu-active");
      menu_email.classList.add("compartir__menu-active");
    }
  }, [canal]);
  return (
    <div className="compartir">
      <h1>CONTACTAR CON EL CLIENTE</h1>
      <br />
      <div className="compartir__container">
        <div className="compartir__nav">
          <Link
            id="menu-whatsapp"
            className="compartir__menu"
            to={`/user/cotizaciones/compartir/${id}/whatsapp/1`}
          >
            Whatsapp
          </Link>
          <Link
            id="menu-email"
            className="compartir__menu"
            to={`/user/cotizaciones/compartir/${id}/email/2`}
          >
            Email
          </Link>
        </div>
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Compartir;

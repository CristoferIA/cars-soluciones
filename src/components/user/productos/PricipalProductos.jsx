import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setNombreMenu } from "../../../store/slices/nombreMenu.slice";

import { Link, Outlet } from "react-router-dom";

const PricipalProductos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNombreMenu("productos"));
  }, []);
  return (
    <div className="container-form">
      <div className="nav-componente">
        <Link className="nav-componente__link" to={"buscar"}>
          Buscar producto
        </Link>
        <Link className="nav-componente__link" to={"nuevo"}>
          Nuevo
        </Link>
      </div>

      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default PricipalProductos;

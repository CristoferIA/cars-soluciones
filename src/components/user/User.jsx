import React, { useEffect, useState } from "react";
import "../../../public/css/user/user.css";
import Navbar from "./layouts/Navbar";
import SideBar from "./layouts/SideBar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import LoaderSesion from "../LoaderSesion";
import getConfig from "../../utils/getConfig";
//import { useDispatch } from "react-redux";
//import { setNombreMenu } from "../../store/slices/nombreMenu.slice";

const User = () => {
  //const dispatch = useDispatch();
  //dispatch(setNombreMenu("ninguno"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validacion, setValidacion] = useState(true);
  useEffect(() => {
    validarSesion();
  }, []);

  const validarSesion = () => {
    setLoading(true);
    const URL = import.meta.env.VITE_API_URL + "validar-token";
    axios
      .post(URL, {}, getConfig())
      .then((res) => setValidacion(true))
      .catch((err) => setValidacion(false))
      .finally(() => {
        setLoading(false);
      });
  };

  if (validacion) {
    return (
      <div className="layouts">
        <Navbar />
        <section className="user-body">
          <SideBar />
          <div className="area-trabajo">
            <Outlet />
          </div>
        </section>
        {loading && <LoaderSesion />}
      </div>
    );
  } else {
    navigate("/login");
  }
};

export default User;

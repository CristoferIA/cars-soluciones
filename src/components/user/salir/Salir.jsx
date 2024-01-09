import axios from "axios";
import React, { useEffect } from "react";
import getConfig from "../../../utils/getConfig";
import { useNavigate } from "react-router-dom";

const Salir = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const URL = import.meta.env.VITE_API_URL + "user/logout";
    axios
      .get(URL, getConfig())
      .then((res) => {
        navigate("/login");
        localStorage.removeItem("token");
      })
      .catch();
  }, []);

  return <div>Esta cerrando sesión...</div>;
};

export default Salir;

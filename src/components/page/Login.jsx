import React, { useEffect, useState } from "react";
import "../../../public/css/page/login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../Loader";
import { useForm } from "react-hook-form";
import getConfig from "../../utils/getConfig";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [validacion, setValidacion] = useState(false);

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

  const submit = () => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("pass").value;
    const mentener_sesion = document.getElementById("mentener_sesion").checked;

    const regexCorreo = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!regexCorreo.test(user)) {
      Swal.fire({
        title: "Alerta",
        text: "El usuario ingresado no es válido",
        icon: "error",
      });
    } else {
      setLoading(true);
      const data = {
        email: user,
        password: password,
        mentener_sesion: mentener_sesion,
      };
      const URL = import.meta.env.VITE_API_URL + "user/login";
      axios
        .post(URL, data)
        .then((res) => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("nombre", res.data.data.name);
          localStorage.setItem("expiration", res.data.expiration);
          navigate("/user");
        })
        .catch((err) => {
          console.log(err.response.data.status);
          Swal.fire({
            title: "Error",
            text: "Las credenciales ingresados no son correctos",
            icon: "error",
          });
        })
        .finally((e) => {
          setLoading(false);
        });
    }
  };

  if (!validacion) {
    return (
      <section className="login">
        <div className="login__form">
          <div className="login__foto">
            <img src="../../../public/images/user.png" alt="" />
          </div>
          <form onSubmit={handleSubmit(submit)}>
            <div className="login__container">
              <label htmlFor="">Usuario: </label>
              <input
                className="login__user"
                type="email"
                placeholder="usuario@example.com"
                id="user"
                required
                {...register("email")}
              />
            </div>
            <div className="login__container">
              <label htmlFor="">Contraseña: </label>
              <input
                className="login__password"
                type="password"
                id="pass"
                required
              />
            </div>
            <div className="login__mantener-sesion">
              <input id="mentener_sesion" type="checkbox" />
              <label htmlFor="mentener_sesion">
                Mantener la sesión iniciada
              </label>
            </div>
            <div className="login__btn-acceder">
              <button type="submit" className="button-enviar">
                Acceder
              </button>
            </div>
          </form>
          <div className="nav_adicionales">
            <Link className="nav__recuperar-password" to="/recuperar-password">
              Olvidé mi contraseña
            </Link>
          </div>
        </div>
        {loading && <Loader />}
      </section>
    );
  } else {
    navigate("/user");
  }
};

export default Login;

import React from "react";
import "../../../public/css/page/rePassword.css";
import { Link } from "react-router-dom";

const RecuperarPassword = () => {
  return (
    <section className="rePassword">
      <div className="repassword__from">
        <h1>Recuperar Contraseña</h1>
        <input type="text" placeholder="Ingrese su correo" />
        <button className="button-enviar">Enviar</button>
        <div>
          <label htmlFor="">No recibio el correo, </label>
          <Link to="">volver a enviar</Link>
        </div>
      </div>
    </section>
  );
};

export default RecuperarPassword;

import React from "react";
import "../../public/css/loaderSesion.css";
const LoaderSesion = () => {
  return (
    <div className="loader-2">
      <div>
        <div className="loader-2__lds-dual-ring"></div>
        <label htmlFor="">
          <b>Iniciando...</b>
        </label>
      </div>
    </div>
  );
};

export default LoaderSesion;

import React from "react";
import "../../public/css/loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <div>
        <div className="lds-dual-ring"></div>
        <label htmlFor="">
          <b>Espere...</b>
        </label>
      </div>
    </div>
  );
};

export default Loader;

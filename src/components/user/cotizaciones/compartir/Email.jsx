import React from "react";

const Email = () => {
  return (
    <div className="compartir__formulario">
      <div>
        <label htmlFor="">Para:</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Asunto:</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="">Mensaje</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <button className="button-enviar">Enviar</button>
    </div>
  );
};

export default Email;

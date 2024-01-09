import React from "react";

const NuevoProducto = () => {
  return (
    <div className="container-filter-form">
      <h3>INGRESE UN NUEVO PRODUCTO</h3>
      <div className="input-form">
        <label htmlFor="">Código original:</label>
        <input type="text" />
      </div>
      <div className="input-form">
        <label htmlFor="">Nombre producto:</label>
        <input type="text" />
      </div>
      <div className="input-form">
        <label htmlFor="">Precio proveedor:</label>
        <input type="text" />
      </div>
      <div className="input-form">
        <label htmlFor="">Estado:</label>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
        </select>
      </div>
      <div className="input-form">
        <label htmlFor="">Modelo:</label>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
        </select>
      </div>
      <div className="input-form">
        <label htmlFor="">Estado visualización:</label>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
        </select>
      </div>
      <div className="input-form">
        <label htmlFor="">Moneda:</label>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
        </select>
      </div>
      <div className="input-form">
        <label htmlFor="">Descripción:</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <button className="button-enviar">Guardar</button>
    </div>
  );
};

export default NuevoProducto;

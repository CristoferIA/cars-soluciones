import React, { useEffect } from "react";

const BusquedaProducto = () => {
  return (
    <div className="container-filter-form">
      <div className="inputs-form">
        <div className="input-form">
          <label htmlFor="">Código de busqueda:</label>
          <input type="text" />
        </div>
        <div className="input-form">
          <label htmlFor="">Nombre producto:</label>
          <input type="text" />
        </div>
        <div className="input-form">
          <label htmlFor="">Fecha inicio:</label>
          <input type="date" />
        </div>
        <div className="input-form">
          <label htmlFor="">Fecha fin:</label>
          <input type="date" />
        </div>
      </div>
      <div className="resultado-form">
        <table border={1} className="tabla-resultado">
          <thead>
            <tr>
              <th>CODIGO</th>
              <th>NOMBRE PRODUCTO</th>
              <th>PRECIO PROV.</th>
              <th>MODELO</th>
              <th>FECHA</th>
              <th>VISUALIZACION</th>
              <th>OPERACIONES</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td>
                <button>editar</button> <button>eliminar</button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td></td>
            </tr>
            <tr>
              <td>1</td>
              <td>abcsdsedfsef</td>
              <td>500.00</td>
              <td>estafa</td>
              <td>20/20/2020</td>
              <td>no</td>
              <td></td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={7}>asdas</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BusquedaProducto;

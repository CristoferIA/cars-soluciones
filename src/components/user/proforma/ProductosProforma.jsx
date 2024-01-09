import React, { useEffect, useState } from "react";
import "../../../../public/css/user/proforma/ProductosProforma.css";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
import { useNavigate } from "react-router-dom";

const ProductosProforma = ({ setProductosAgregados, productosAgregados }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [buscarProducto, setBuscarProducto] = useState("");
  useEffect(() => {
    const URL = import.meta.env.VITE_API_URL + "producto";

    axios
      .get(URL, getConfig())
      .then((response) => {
        setProductos(response.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          navigate("../../login");
        } else {
          console.log(err.response.data);
        }
      });
  }, []);

  const addProductos = (product) => {
    const temp_producto = {
      idProductos: product.id,
      cantidad: 1,
      precioUnitario: product.precioProveedor,
      precioTotal: parseFloat(product.precioProveedor).toFixed(2),
      nombreProducto: product.nombreProducto,
    };

    const productoIndex = productosAgregados.findIndex(
      (p) => p.idProductos === product.id
    );

    if (productoIndex !== -1) {
      let temp = [...productosAgregados];
      temp[productoIndex].cantidad =
        parseInt(productosAgregados[productoIndex].cantidad) + 1;
      temp[productoIndex].precioTotal = parseFloat(
        productosAgregados[productoIndex].cantidad *
          productosAgregados[productoIndex].precioUnitario
      ).toFixed(2);

      setProductosAgregados(temp);
    } else {
      const temp = [...productosAgregados, temp_producto];

      setProductosAgregados(temp);
    }
  };

  const nombreFilter = (filtro) => {
    setBuscarProducto(filtro);
  };

  return (
    <div id="producto_proforma" className="proforma-productos ocultar-proforma">
      <section>
        <button
          type="button"
          onClick={() => {
            ocultarProforma("producto_proforma");
          }}
        >
          Cerrar productos
        </button>
      </section>
      <div className="proforma-productos__main">
        <section className="proforma-productos__buscar">
          <input
            type="search"
            placeholder="Buscar producto"
            onChange={(event) => {
              nombreFilter(event.target.value);
            }}
          />
        </section>
        <section className="proforma-productos__all-items">
          {buscarProducto == ""
            ? productos?.map((item) => (
                <div key={item.id} className="proforma-productos__item">
                  <label htmlFor={`btn_addProduct${item.id}`}>
                    {item.nombreProducto}
                  </label>
                  <button
                    type="button"
                    id={`btn_addProduct${item.id}`}
                    onClick={() => {
                      addProductos(item);
                    }}
                  >
                    +
                  </button>
                </div>
              ))
            : productos
                ?.filter((p) =>
                  p.nombreProducto
                    .toLowerCase()
                    .includes(buscarProducto.toLowerCase())
                )
                .map((item) => (
                  <div key={item.id} className="proforma-productos__item">
                    <label htmlFor={`btn_addProduct${item.id}`}>
                      {item.nombreProducto}
                    </label>
                    <button
                      type="button"
                      id={`btn_addProduct${item.id}`}
                      onClick={() => {
                        addProductos(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                ))}
        </section>
      </div>
    </div>
  );
};

const ocultarProforma = (id) => {
  const div_producto = document.getElementById(id);
  div_producto.classList.toggle("ocultar-proforma");
};

export default ProductosProforma;
export { ocultarProforma };

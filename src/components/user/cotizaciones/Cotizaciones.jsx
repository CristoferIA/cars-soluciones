import React, { useEffect, useState } from "react";
import "../../../../public/css/user/cotizaciones/principalCotizaciones.css";
import axios from "axios";
import Loader from "../../Loader";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import getConfig from "../../../utils/getConfig";
import { useDispatch } from "react-redux";
import { setNombreMenu } from "../../../store/slices/nombreMenu.slice";

const Cotizaciones = () => {
  const dispatch = useDispatch();
  dispatch(setNombreMenu("cotizaciones"));
  const [estadoCotizacion, setEstadoCotizacion] = useState([]);
  const [cotizacion, setCotizacion] = useState([]);
  const [loading, setLoading] = useState(false);
  const [urlPagina, setUrlPagina] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    selectEstadoCotizacion();
    listaCotizaciones();
  }, []);
  const selectEstadoCotizacion = () => {
    setLoading(true);

    const URL = import.meta.env.VITE_API_URL + "estado-cotizacion";

    axios
      .get(URL, getConfig())
      .then((response) => {
        setEstadoCotizacion(response.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          navigate("../../login");
        } else {
          console.log(err.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    listaCotizaciones();
  }, [urlPagina]);

  const listaCotizaciones = () => {
    setLoading(true);
    const nombre = document.getElementById("nombre").value;
    const ruc = document.getElementById("ruc").value;
    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_fin = document.getElementById("fecha_fin").value;
    const estado = document.getElementById("estado").value;

    //const URL = import.meta.env.VITE_API_URL + "proforma";
    const URL_temp =
      import.meta.env.VITE_API_URL +
      `all-filter-proforma?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&nombre=${nombre}&ruc=${ruc}&estado=${estado}`;

    let URL_temp_2;
    if (urlPagina) {
      URL_temp_2 =
        urlPagina +
        `&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&nombre=${nombre}&ruc=${ruc}&estado=${estado}`;
    }

    const URL = URL_temp_2 || URL_temp;

    axios
      .get(URL, getConfig())
      .then((response) => {
        setCotizacion(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          navigate("../../login");
        } else {
          console.log(err.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUrl = (url) => {
    if (url) {
      setUrlPagina(url);
    }
  };

  const descargarPDF = (idCotizacion) => {
    setLoading(true);
    const URL =
      urlPagina || import.meta.env.VITE_API_URL + `proforma/${idCotizacion}`;
    axios
      .get(URL, getConfig())
      .then((response) => {
        generarPDF(response.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          navigate("../../login");
        } else {
          console.log(err.response.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const form_compartir = (id) => {
    navigate(`/user/cotizaciones/compartir/${id}/whatsapp/1`);
  };

  const handleChangeCotizaciones = () => {
    listaCotizaciones();
  };

  return (
    <div className="cotizaciones">
      <h1>BUSCAR COTIZACIONES</h1>
      <section>
        <div className="cotizaciones__nombre-ruc">
          <div className="cotizaciones__ruc">
            <label htmlFor="">Ingrese RUC:</label>
            <input id="ruc" type="search" onChange={handleChangeCotizaciones} />
          </div>
          <div className="cotizaciones__nombre-cliente">
            <label htmlFor="">Ingrese nombre cliente:</label>
            <input
              id="nombre"
              type="search"
              onChange={handleChangeCotizaciones}
            />
          </div>
        </div>
        <div className="cotizaciones__fecha-estado">
          <div>
            <label htmlFor="">Fecha inico:</label>
            <input
              id="fecha_inicio"
              type="date"
              onChange={handleChangeCotizaciones}
            />
          </div>
          <div>
            <label htmlFor="">Fecha fin:</label>
            <input
              id="fecha_fin"
              type="date"
              onChange={handleChangeCotizaciones}
            />
          </div>
          <div>
            <label htmlFor="">Estado cotización:</label>
            <select id="estado" onChange={handleChangeCotizaciones}>
              <option value="">--Seleccione--</option>
              {estadoCotizacion?.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>
      <section>
        <div className="cotizaciones__container-table">
          <table border={1} className="cotizaciones__tabla">
            <thead>
              <tr>
                <th># COTI.</th>
                <th>RUC</th>
                <th>EMPRESA/CLIENTE</th>
                <th>MONEDA</th>
                <th>ADELANTO</th>
                <th>SUBTOTAL</th>
                <th>TOTAL</th>
                <th>FECHA</th>
                <th>OPERACIONES</th>
              </tr>
            </thead>
            <tbody>
              {cotizacion.total === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <br />
                    <label htmlFor="">No hay resultados en la búsqueda</label>
                    <br />
                    <br />
                  </td>
                </tr>
              ) : (
                cotizacion.data?.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.ruc}</td>
                    <td>{c.nombreEmpresaCliente}</td>
                    <td>{c.simboloMoneda}</td>
                    <td>{c.montoAdelanto}</td>
                    <td>{c.subtotal}</td>
                    <td>{c.total}</td>
                    <td>{convertirFecha(c.fechaRegistrado)}</td>
                    <td>
                      <div>
                        <button
                          onClick={() => {
                            descargarPDF(c.id);
                          }}
                        >
                          PDF
                        </button>
                        <button
                          onClick={() => {
                            form_compartir(c.id);
                          }}
                        >
                          Compartir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={9}>
                  <span>Páginas: {cotizacion.last_page}</span>
                  <button
                    onClick={() => {
                      handleUrl(cotizacion.first_page_url);
                    }}
                  >
                    {"<<"}
                  </button>
                  <button
                    onClick={() => {
                      handleUrl(cotizacion.prev_page_url);
                    }}
                  >
                    {"<"}
                  </button>
                  <button>{cotizacion.current_page}</button>
                  <button
                    onClick={() => {
                      handleUrl(cotizacion.next_page_url);
                    }}
                  >
                    {">"}
                  </button>
                  <button
                    onClick={() => {
                      handleUrl(cotizacion.last_page_url);
                    }}
                  >
                    {">>"}
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>
      <div>{loading && <Loader />}</div>
    </div>
  );
};
const convertirFecha = (fecha) => {
  const partesFecha = fecha.split("-");
  const fechaObj = new Date(
    parseInt(partesFecha[0]),
    parseInt(partesFecha[1]) - 1, // Restamos 1 al mes ya que en JavaScript los meses son de 0 a 11
    parseInt(partesFecha[2]),
    0,
    0,
    0,
    0
  );

  // Opciones para formatear la fecha
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Lima", // Especifica la zona horaria de Lima, Perú
  };

  const formattedDate = fechaObj.toLocaleDateString("es-PE", options);

  return formattedDate;
};
const generarPDF = (data) => {
  var doc = new jsPDF();
  // Empty square
  //doc.rect(10, 10, 190, 280);
  //doc.rect(10, 10, 45, 20);

  doc.addImage("../../../../public/images/logo.png", "PNG", 10, 10, 45, 20);

  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 87, 51);
  doc.text(133, 19, "PROFORMA");

  doc.setDrawColor(255, 199, 188);
  doc.setTextColor("black");
  doc.setFontSize(9);
  doc.text(
    198,
    25,
    "Av. Nicolás Arriola 743 Urb. Santa Catalina - La Victoria - Lima",
    "right"
  );
  doc.line(55, 21, 200, 21);
  doc.text(198, 30, "RUC: 20604231559 - Cel: 951024852", "right");
  doc.line(55, 27, 200, 27);

  doc.setLineWidth(1);
  doc.line(10, 31.5, 200, 31.5);
  doc.setLineWidth(0.1);
  doc.setDrawColor(0, 0, 0);

  doc.setFillColor(0, 0, 0);
  doc.rect(10, 32, 50, 6, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor("WHITE");
  doc.text(12, 36.5, "EMPRESA/CLIENTE");

  doc.setFillColor(255, 199, 188);
  doc.rect(160, 32, 40, 6, "F");

  /* const fecha = new Date(data.fechaRegistrado);
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getFullYear();*/

  doc.setTextColor("black");
  doc.text(140, 36, "Fecha:");
  doc.text(165, 36, `${convertirFecha(data.fechaRegistrado)}`);

  doc.setFillColor(255, 199, 188);
  doc.rect(10, 39, 15, 6, "F");
  doc.setDrawColor(255, 199, 188);
  doc.rect(25, 39, 35, 6, "D");

  const ruc_cliente = data.ruc || "";
  doc.text(11, 43.5, "RUC:");
  doc.setFontSize(11);
  doc.text(28, 43, `${ruc_cliente}`);

  doc.setFillColor(255, 199, 188);
  doc.rect(10, 46, 5, 6, "F");
  doc.setDrawColor(255, 199, 188);
  doc.rect(15, 46, 115, 6, "D");
  doc.text(12, 49.5, ":");
  doc.setFontSize(8.5);
  doc.text(16, 50, `${data.nombreEmpresaCliente}`);

  doc.setFillColor("black");
  doc.rect(130, 38, 70, 6, "F");

  doc.setTextColor("white");
  doc.setFontSize(11);
  doc.text(135, 42, "COTIZACIÓN:");
  doc.text(198, 42, `Nro.- ${data.id}`, "right");

  doc.setTextColor("black");
  doc.text(135, 49, "Tipo de Cambio: $");
  doc.text(198, 49, `${data.tipoCambioSoles}`, "right");
  doc.setDrawColor("black");
  doc.rect(130, 43.5, 70, 8.5);

  // cabecera de ITEMS DEL FORULARIO

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setDrawColor("white");

  doc.setFillColor("black");
  doc.rect(10, 53, 15, 8, "FD");
  doc.setTextColor("white");
  doc.text(12, 58, "ITEM");

  doc.setDrawColor("white");
  doc.setFillColor("black");
  doc.rect(25, 53, 105, 8, "FD");
  doc.text(60, 58, "DESCRIPCIÓN");

  doc.setDrawColor("white");
  doc.setFillColor("black");
  doc.rect(130, 53, 15, 8, "FD");
  doc.text(131, 58, "CANT.");

  doc.setDrawColor("white");
  doc.setFillColor("black");
  doc.rect(145, 53, 25, 8, "FD");
  doc.text(150, 58, "P. UNIT.");

  doc.setDrawColor("white");
  doc.setFillColor("black");
  doc.rect(170, 53, 30, 8, "FD");
  doc.text(175, 58, "P.TOTAL");

  doc.setDrawColor("black");
  doc.line(10, 60, 10, 205);
  doc.line(25, 60, 25, 205);
  doc.line(130, 60, 130, 205);
  doc.line(145, 60, 145, 205);
  doc.line(170, 60, 170, 205);
  doc.line(200, 60, 200, 205);
  doc.line(10, 205, 200, 205);

  // ITEMS DEL FORULARIO
  doc.setFont("helvetica", "normal");
  doc.setTextColor("black");
  doc.setFontSize(9);

  let n = 1;
  let i_y = 65;
  const espacio = 6;
  data.items.forEach((item) => {
    doc.text(17, i_y, `${n++}`, "center");
    doc.text(27, i_y, item.nombreProducto);
    doc.text(137, i_y, `${item.cantidad}`, "center");
    doc.text(146, i_y, `${data.simboloMoneda}`);
    doc.text(169, i_y, `${item.precioUnitario}`, "right");
    doc.text(171, i_y, `${data.simboloMoneda}`);
    doc.text(199, i_y, `${item.precioTotal}`, "right");
    i_y += espacio;
  });

  // PIE DE PÁGINA
  doc.setDrawColor("white");
  doc.rect(10, 207, 190, 83, "D");

  doc.setFillColor(255, 87, 51);
  doc.rect(10, 207, 100, 6.5, "F");
  doc.setTextColor("white");
  doc.setFont("helvetica", "bold");
  doc.text(12, 211, "COMENTARIOS ADICIONALES");

  doc.setDrawColor(255, 87, 51);
  doc.rect(10, 215, 100, 75, "D");

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");

  let c_y1 = 220;
  let c_y2 = c_y1 + 4;
  let c_y3 = c_y2 + 4;
  data.cuentasBancarias.forEach((cuenta) => {
    doc.setTextColor(255, 87, 51);
    doc.text(12, c_y1, `Cuenta ${cuenta.nombreBanco}: ${cuenta.titular}`);
    doc.text(
      12,
      c_y2,
      `Cuenta ${cuenta.descripcionTipoCuenta} (${cuenta.nombreMoneda}): ${cuenta.numeroCuenta}`
    );
    doc.setTextColor("black");
    doc.text(12, c_y3, `CCI: ${cuenta.cci}`);

    c_y1 = c_y3 + 7;
    c_y2 = c_y1 + 4;
    c_y3 = c_y2 + 4;
  });

  doc.setFontSize(8);
  doc.text(12, 271, "Whatsapp: 951 024 852");
  doc.text(12, 275, "Facebook: Jorge Valentin Yucra Pañihuara");
  doc.text(12, 279, "E-mail: valentinyucra@gmail.com");
  doc.text(12, 283, "Nombre y Apellido: Valentín Yucra Pañihuara");
  doc.setFontSize(14);
  doc.text(12, 289, "Asesor Comercial");

  //doc.setFillColor(255, 87, 51);
  // doc.rect(110, 225, 90, 65, "D");

  doc.setFillColor(255, 87, 51);
  doc.rect(118, 207, 40, 7, "F");
  doc.setTextColor("white");
  doc.text("SubTotal:", 155, 212.5, "right");
  doc.rect(158, 207, 42, 7, "D");
  doc.setTextColor("black");
  doc.text(`${data.simboloMoneda}`, 160, 212.5);
  doc.text(`${data.subtotal}`, 198, 212.5, "right");

  doc.setFillColor(255, 87, 51);
  doc.rect(158, 215.5, 42, 7, "D");
  doc.setTextColor("black");
  doc.setFontSize(12);
  doc.text(`${data.descripcionDetallerIgv}`, 199, 220.5, "right");

  doc.setFontSize(14);
  doc.setFillColor(255, 87, 51);
  doc.rect(118, 224, 40, 7, "F");
  doc.setTextColor("white");
  doc.text("TOTAL:", 155, 229, "right");
  doc.rect(158, 224, 42, 7, "D");
  doc.setTextColor("black");
  doc.text(`${data.simboloMoneda}`, 160, 229);
  doc.text(`${data.total}`, 198, 229, "right");

  doc.rect(112, 233, 88, 45, "D");
  doc.setFontSize(12);

  const maxWidth = 85;
  const texto = data.detalleAdelanto || "";
  const lines = doc.splitTextToSize(`${texto}`, maxWidth);
  const x = 114;
  let y = 239;
  lines.forEach((line) => {
    doc.text(x, y, line);
    // Incrementa la coordenada Y para la siguiente línea
    y += 5; // Puedes ajustar esto según sea necesario
  });

  doc.setFillColor(255, 87, 51);
  doc.rect(118, 279.5, 40, 7, "F");
  doc.setFontSize(14);
  doc.setTextColor("white");
  doc.text("ADELANTO:", 155, 285, "right");
  doc.rect(158, 279.5, 42, 7, "D");
  doc.setTextColor("black");
  doc.text(`${data.simboloMoneda}`, 163, 284.5, "right");
  doc.text(`${data.montoAdelanto}`, 198, 284.5, "right");

  const fechaActual = new Date();
  const dia_actual = fechaActual.getDate().toString().padStart(2, "0");
  const mes_actual = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
  const anio_actual = fechaActual.getFullYear();

  doc.save(
    data.nombreEmpresaCliente + ` ${dia_actual}-${mes_actual}-${anio_actual}`
  );
};

export default Cotizaciones;

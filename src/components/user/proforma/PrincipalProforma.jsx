import React, { useEffect, useState } from "react";
import "../../../../public/css/user/proforma/principalProforma.css";
import ProductosProforma, { ocultarProforma } from "./ProductosProforma";
import axios from "axios";
import Loader from "../../Loader";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import getConfig from "../../../utils/getConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNombreMenu } from "../../../store/slices/nombreMenu.slice";

const PrincipalProforma = () => {
  const dispatch = useDispatch();
  dispatch(setNombreMenu("proforma"));

  const navigate = useNavigate();
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [precioTotal, setPrecioTotal] = useState();
  const [subTotal, setSubTotal] = useState();
  const [adelanto, setAdelanto] = useState();
  const [estadoCotizacion, setEstadoCotizacion] = useState();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const [nroCotizacion, setNroCotizacion] = useState();
  const [simboloMoneda, setSimboloMoneda] = useState();
  const [addIgv, setAddIgv] = useState();
  const [cuentasBanco, setCuentasBanco] = useState([]);
  let item = 1;

  useEffect(() => {
    selectEstadoCotizacion();
    numeroCotizacion();
    onclickMoneda();
    onclickIGV();
    setAdelanto(0);
  }, []);

  useEffect(() => {
    let sumaPrecios = 0;
    productosAgregados.forEach((p) => {
      sumaPrecios = sumaPrecios + parseFloat(p.precioTotal);
    });

    setPrecioTotal(sumaPrecios);
  }, [productosAgregados]);

  useEffect(() => {
    if (precioTotal) {
      setSubTotal(precioTotal - adelanto);
    } else {
      setSubTotal(0);
    }
  }, [adelanto, precioTotal]);

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
  const numeroCotizacion = () => {
    setLoading(true);
    const URL2 = import.meta.env.VITE_API_URL + "nro-cotizacion";
    axios
      .get(URL2, getConfig())
      .then((response) => setNroCotizacion(response.data.data))
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

  const handlePrecioUnitario = (id, e) => {
    const precio_unitario = e.target.value || 0;
    const indexProducto = productosAgregados.findIndex(
      (p) => p.idProductos === id
    );
    const tempProducto = [...productosAgregados];
    tempProducto[indexProducto].precioUnitario =
      parseFloat(precio_unitario).toFixed(2);
    tempProducto[indexProducto].precioTotal = parseFloat(
      precio_unitario * productosAgregados[indexProducto].cantidad
    ).toFixed(2);
    setProductosAgregados(tempProducto);
  };

  const handleCantidad = (id, e) => {
    const cantidad = e.target.value || 1;
    const indexProducto = productosAgregados.findIndex(
      (p) => p.idProductos === id
    );
    const tempProducto = [...productosAgregados];
    tempProducto[indexProducto].cantidad = cantidad;
    tempProducto[indexProducto].precioTotal = parseFloat(
      cantidad * productosAgregados[indexProducto].precioUnitario
    ).toFixed(2);
    setProductosAgregados(tempProducto);
  };

  const handleQuitarProducto = (id) => {
    let nuevoArray = productosAgregados.filter((p) => p.idProductos !== id);
    setProductosAgregados(nuevoArray);
  };

  const submit = (dato) => {
    const igv = document.querySelector('input[name="igv"]:checked').value;
    const moneda = document.querySelector('input[name="moneda"]:checked').value;
    const descripcion_adelanto = document.getElementById(
      "descripcion_adelanto"
    ).value;
    const monto_adelanto = document.getElementById("monto_adelanto").value;

    const data = {
      idEstadoCotizaciones: dato.estado_cotizacion,
      idDetalleIgv: igv,
      idMonedas: moneda,
      fechaRegistrado: dato.fecha,
      nombreEmpresaCliente: dato.empresa,
      ruc: dato.ruc,
      tipoCambioSoles: document.getElementById("tipo_cambio").value,
      subtotal: subTotal,
      total: precioTotal,
      detalleAdelanto: descripcion_adelanto,
      montoAdelanto: monto_adelanto,
      items: productosAgregados,
    };

    if (!productosAgregados.length) {
      Swal.fire({
        title: "Alerta",
        text: "No se han agregado productos a la proforma",
        icon: "info",
      });
    } else {
      //  console.log(data);
      setLoading(true);

      const URL = import.meta.env.VITE_API_URL + "proforma";
      axios
        .post(URL, data, getConfig())
        .then((response) => {
          console.log(response.data);
          Swal.fire({
            title: "Éxito",
            text: "Se guardó satisfactoriamente",
            icon: "success",
          });
          resetForm();
          numeroCotizacion();
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
    }
  };

  const resetForm = () => {
    setValue("empresa", "");
    setValue("ruc", "");
    setValue("estado_cotizacion", "");
    document.getElementById("descripcion_adelanto").value = "";
    document.getElementById("monto_adelanto").value = 0;
    setProductosAgregados([]);
  };

  const manejarKeyDownGlobal = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
      e.preventDefault(); // Prevenir la acción predeterminada (envío del formulario)
    }
  };

  const redondearDosDecimales = (e) => {
    if (!e.target.value) {
      e.target.value = parseFloat(0).toFixed(2);
    } else {
      e.target.value = parseFloat(e.target.value).toFixed(2);
    }
  };

  const onclickMoneda = () => {
    const moneda = document.querySelector('input[name="moneda"]:checked').value;
    if (moneda === "1") {
      setSimboloMoneda("S/.");
    } else {
      setSimboloMoneda("$");
    }
  };
  const onclickIGV = () => {
    setLoading(true);
    const igv = document.querySelector('input[name="igv"]:checked').value;

    const URL = import.meta.env.VITE_API_URL + "cuentas-bancarias/" + igv;

    axios
      .get(URL, getConfig())
      .then((response) => {
        setCuentasBanco(response.data.data);
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

    if (igv === "1") {
      setAddIgv("NO INCLUYE IGV");
    } else {
      setAddIgv("INCLUYE IGV");
    }
  };

  const validaTamaño = (e) => {
    const valor = e.target.value;
    if (valor.length > 11) {
      const nuevoValor = valor.slice(0, -1);
      e.target.value = nuevoValor;
    }
  };

  const handleChangeAdelanto = (e) => {
    setAdelanto(e.target.value);
  };

  const validarNumero = (e) => {
    const valor = e.target.value;
    const lastChar = valor.charAt(valor.length - 1);
    const charCode = lastChar.charCodeAt(0);
    //console.log(charCode);
    if (charCode === 46 || (charCode >= 48 && charCode <= 57)) {
      e.target.value = valor;
    } else {
      e.target.value = valor.slice(0, -1);
    }
  };

  const textMayuscula = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const seleccionarContenido = (event) => {
    event.target.select();
  };

  return (
    <form onSubmit={handleSubmit(submit)} onKeyDown={manejarKeyDownGlobal}>
      <div className="principal-proforma">
        <h1>REALIZAR NUEVA COTIZACIÓN</h1>
        <div className="header-proforma">
          <div>
            <label className="header-proforma__label" htmlFor="">
              Nro. Cotización:
            </label>
            <input
              type="text"
              id="nro-cotizacion"
              defaultValue={nroCotizacion}
              disabled
            />
          </div>
          <div>
            <label className="header-proforma__label" htmlFor="">
              Empresa/Cliente (*):
            </label>
            <input
              type="text"
              id="empresa"
              {...register("empresa")}
              required
              autoComplete="off"
              onChange={(event) => {
                textMayuscula(event);
              }}
            />
          </div>
          <section>
            <div>
              <label className="header-proforma__label" htmlFor="">
                RUC {"(opcional)"}:
              </label>
              <input
                type="number"
                id="ruc"
                {...register("ruc")}
                autoComplete="off"
                onChange={(event) => {
                  validaTamaño(event);
                }}
              />
            </div>
            <div>
              <label className="header-proforma__label" htmlFor="">
                Fecha (*):
              </label>
              <input
                type="date"
                id="fecha"
                {...register("fecha")}
                required
                defaultValue={
                  new Date().getFullYear() +
                  "-" +
                  (new Date().getMonth() + 1).toString().padStart(2, "0") +
                  "-" +
                  new Date().getDate().toString().padStart(2, "0")
                }
              />
            </div>
            <div>
              <label className="header-proforma__label" htmlFor="">
                Estado cotización (*):
              </label>
              <select
                id="estado_cotizacion"
                {...register("estado_cotizacion")}
                required
              >
                <option value={""}>-- Seleccione --</option>
                {estadoCotizacion?.map((estado) => (
                  <option key={estado.id} value={estado.id}>
                    {estado.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="header-proforma__label" htmlFor="">
                Tipo de cambio (*):
              </label>
              <input
                type="text"
                id="tipo_cambio"
                {...register("tipo_cambio_soles")}
                autoComplete="off"
                required
                onChange={(event) => {
                  validarNumero(event);
                }}
                onBlur={(event) => {
                  redondearDosDecimales(event);
                }}
              />
            </div>
          </section>
        </div>
        <div className="proforma-main">
          <table border={1}>
            <thead>
              <tr>
                <th>ITEM</th>
                <th>DESCRIPCIÓN</th>
                <th>CANT.</th>
                <th>PRECIO UNIT.</th>
                <th>PRECIO TOTAL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productosAgregados.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <br />
                    No hay productos agregados
                    <br />
                    <br />
                  </td>
                </tr>
              ) : (
                productosAgregados?.map((p) => (
                  <tr key={p.idProductos}>
                    <td>{item++}</td>
                    <td>{p.nombreProducto}</td>
                    <td>
                      <input
                        type="number"
                        value={p.cantidad}
                        onChange={(event) => {
                          handleCantidad(p.idProductos, event);
                        }}
                        onClick={(event) => {
                          seleccionarContenido(event);
                        }}
                      />
                    </td>
                    <td>
                      <div>
                        <span>{simboloMoneda}</span>
                        <input
                          type="number"
                          defaultValue={p.precioUnitario}
                          onChange={(event) => {
                            handlePrecioUnitario(p.idProductos, event);
                          }}
                          onBlur={(event) => {
                            redondearDosDecimales(event);
                          }}
                          onClick={(event) => {
                            seleccionarContenido(event);
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div>
                        <span>{simboloMoneda}</span>
                        <b>{p.precioTotal}</b>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          handleQuitarProducto(p.idProductos);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>Sub Total: {simboloMoneda}</td>
                <td>
                  <input
                    type="number"
                    readOnly
                    defaultValue={subTotal?.toFixed(2)}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={4}></td>
                <td>
                  <input
                    id="addIgv"
                    type="text"
                    readOnly
                    defaultValue={addIgv}
                  />
                </td>
                <td></td>
              </tr>
              <tr>
                <td colSpan={4}>TOTAL: {simboloMoneda}</td>
                <td>
                  <input
                    type="number"
                    readOnly
                    defaultValue={precioTotal?.toFixed(2)}
                  />
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              ocultarProforma("producto_proforma");
            }}
          >
            + Agregar Productos
          </button>
        </div>
        <div>
          <ProductosProforma
            setProductosAgregados={setProductosAgregados}
            productosAgregados={productosAgregados}
          />
        </div>
        <div className="proforma-footer">
          <section>
            <div className="proforma-footer__opciones">
              <div className="proforma__opciones">
                <input
                  type="radio"
                  id="con_igv"
                  name="igv"
                  value={2}
                  onChange={onclickIGV}
                />
                <label htmlFor="con_igv">Con IGV</label>
              </div>
              <div className="proforma__opciones">
                <input
                  type="radio"
                  defaultChecked
                  id="sin_igv"
                  name="igv"
                  value={1}
                  onChange={onclickIGV}
                />
                <label htmlFor="sin_igv">Sin IGV</label>
              </div>
            </div>
            <div className="proforma-footer__opciones">
              <div className="proforma__opciones">
                <input
                  type="radio"
                  id="soles"
                  name="moneda"
                  value={1}
                  onChange={onclickMoneda}
                />
                <label htmlFor="soles">Soles</label>
              </div>
              <div className="proforma__opciones">
                <input
                  type="radio"
                  defaultChecked
                  id="dolares"
                  name="moneda"
                  value={2}
                  onChange={onclickMoneda}
                />
                <label htmlFor="dolares">Dolares</label>
              </div>
            </div>
            <div className="proforma__descripcion-adelanto">
              <label htmlFor="">Descripción de adelanto (opcional):</label>
              <textarea
                name=""
                id="descripcion_adelanto"
                cols="30"
                rows="3"
                placeholder="Máximo 500 caracteres"
              ></textarea>
            </div>
            <div className="proforma__monto-adelanto">
              <label htmlFor="">Adelanto (opcional):</label>
              <div>
                <span>{simboloMoneda}</span>
                <input
                  type="number"
                  id="monto_adelanto"
                  autoComplete="off"
                  defaultValue={adelanto}
                  onChange={(event) => {
                    handleChangeAdelanto(event);
                  }}
                  onBlur={(event) => {
                    redondearDosDecimales(event);
                  }}
                  onClick={(event) => {
                    seleccionarContenido(event);
                  }}
                />
              </div>
            </div>
          </section>
          <section>
            {cuentasBanco?.map((cuenta) => (
              <div key={cuenta.id} className="cuentas-bancarias">
                <label htmlFor="">
                  <b>Banco:</b> {cuenta.nombreBanco}
                </label>
                <label htmlFor="">
                  <b>Moneda:</b> {cuenta.nombre}
                </label>
                <label htmlFor="">
                  <b>Nro. de cuenta:</b> {cuenta.numeroCuenta}
                </label>
                <label htmlFor="">
                  <b>CCI:</b> {cuenta.cci}
                </label>
                <label htmlFor="">
                  <b>Titular:</b> {cuenta.titular}
                </label>
              </div>
            ))}
          </section>
        </div>
        <div className="proforma__btn-enviar">
          <button type="submit" className="button-enviar">
            Registrar
          </button>
        </div>
        <br />
        {loading && <Loader />}
        <br />
        <br />
      </div>
    </form>
  );
};

export default PrincipalProforma;

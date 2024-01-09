import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getConfig from "../../../../utils/getConfig";
import Swal from "sweetalert2";

const Whatsapp = () => {
  const { id } = useParams();
  const [datosCotizacion, setDatosCotizacion] = useState();
  const [mensajeCliente, setMensajeCliente] = useState();
  useEffect(() => {
    solicitarInformacion();
  }, []);
  useEffect(() => {
    const msn = `Estimado/a ${datosCotizacion?.nombreEmpresaCliente},

Adjunto encontrarás el resumen de tu reciente cotización con nosotros. Revisar la información y, si es necesario, no dudes en contactarnos.
    
Agradecemos tu preferencia.
    
Saludos,
System Cars Solutions`;
    setMensajeCliente(msn);
  }, [datosCotizacion]);

  const handleEnviar = () => {
    const number = document.getElementById("fono").value;
    const mensaje = document.getElementById("mensaje").value;

    if (number === "" || number.length < 9) {
      Swal.fire({
        title: "Error",
        text: "El número telefónico es obligatorio y debe tener 9 números.",
        icon: "error",
      });
    } else if (mensaje === "") {
      Swal.fire({
        title: "Error",
        text: "Es obligatorio enviar un mensaje.",
        icon: "error",
      });
    } else {
      const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
        "+51" + number
      )}&text=${encodeURIComponent(mensaje)}`;
      window.open(url, "_blank");
    }
  };

  const maxleng = (e) => {
    const valor = e.target.value;
    if (valor.length <= 9) {
      e.target.value = valor;
    } else {
      e.target.value = valor.slice(0, -1);
    }
  };

  const solicitarInformacion = () => {
    const URL = import.meta.env.VITE_API_URL + "proforma/" + id;
    console.log(URL);
    axios
      .get(URL, getConfig())
      .then((response) => {
        setDatosCotizacion(response.data.data);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthenticated.") {
          navigate("../../login");
        } else {
          console.log(err.response.data);
        }
      });
  };

  return (
    <div className="compartir__formulario">
      <div>
        <label htmlFor="">Nro. Celular:</label>
        <div className="phone-number">
          <label htmlFor="">+51</label>
          <input
            id="fono"
            type="number"
            onChange={(event) => {
              maxleng(event);
            }}
          />
        </div>
      </div>
      <div>
        <label htmlFor="">Mensaje:</label>
        <textarea
          name=""
          id="mensaje"
          cols="30"
          rows="15"
          defaultValue={mensajeCliente}
        ></textarea>
      </div>
      <button onClick={handleEnviar} className="button-enviar">
        Enviar
      </button>
    </div>
  );
};

export default Whatsapp;

import React from "react";
import "../../../public/css/page/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div>
          <div className="nav__nombreEmpresa">
            <div className="nombreEmpresa__logo">LOGO</div>
            <div className="nombreEmpresa__nombre">NOMBRE EMPRESA</div>
          </div>
          <div className="nav__menuOpciones">
            <ul>
              <li>
                <Link className="menuOpciones__link" to="Home">
                  Home
                </Link>
              </li>
              <li>
                <Link className="menuOpciones__link" to="Home">
                  Quienes somos
                </Link>
              </li>
              <li>
                <Link className="menuOpciones__link" to="Home">
                  Productos
                </Link>
              </li>
              <li>
                <Link className="menuOpciones__link" to="login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

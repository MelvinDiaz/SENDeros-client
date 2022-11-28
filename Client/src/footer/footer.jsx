import React from "react";
import "./footer.css"
import Swal from "sweetalert2";
import gitimg from "../imgs/github.png";

const Footer = () => {

  const alertaAyuda = () => {
    Swal.fire({
      title: '<strong>¿Cómo crear marcadores</strong>',
      icon: 'info',
      html:
        '<li> Debes iniciar sesión </li> ' +
        '<li> Dar doble click en el mapa </li> ',
      showCloseButton: true,
      
    })
  }

  return (
    <div className="main-footer">
        <div className="github">
          <a href="https://github.com/Programacion-Web-02-2022/proyecto-webelopers" target={"_blank"}>
            <img src={gitimg}></img>
          </a>
        </div>

        <button className="boton-poner-marcadores" onClick={alertaAyuda} >¿Cómo agrego marcadores?
        </button>
         
    </div>
  );
};

export default Footer;

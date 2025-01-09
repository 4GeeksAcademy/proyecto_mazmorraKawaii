import React from 'react';
import { Link } from 'react-router-dom';
import { PiInstagramLogoThin } from 'react-icons/pi';
import "../../styles/footer.css";
import logo from "../../img/logo.png";

export const Footer = () => {
  return (
    <footer className="footer">
      {/* Contenedor superior */}
      <div className="footer-top">
        <div className="footer-logo-text">
          <img src={logo} alt="Logo de tu tienda" className="footer-logo" />
          <p className="footer-text">
            Somos una tienda en crecimiento y agradecemos todo su apoyo. ¡Diviértanse jugando con nosotros! 
            No olviden visitar nuestra pestaña de Informaciones y contáctenos si tienen dudas. 💖
          </p>
        </div>
        <div className="footer-social">
          <Link
            to="https://www.instagram.com/latabernadelorcofeliz?igsh=NjJ2cXlwOXFldmlu"
            target="_blank"
            className="footer-follow-link"
          >
            Síguenos
            <PiInstagramLogoThin className="footer-icon" />
          </Link>
        </div>
      </div>

      {/* Línea separadora */}
      <hr className="footer-divider" />

      {/* Contenedor inferior */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © 2025 Mazmorra kawaii - Tienda Especializada. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

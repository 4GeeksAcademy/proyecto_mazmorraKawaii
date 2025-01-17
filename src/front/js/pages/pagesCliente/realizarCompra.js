import React from "react";
import Formulario from "../../component/form";
import "../../../styles/form.css";

const Compra = () => {
  const fields = [
    {
      name: "nombre_cliente",
      label: "Nombre del Cliente",
      type: "text",
      // required: true,
      placeholder: "Leia Organa",
    },
    {
      name: "direccion_cliente",
      label: "Dirección",
      type: "text",
      // required: true,
      placeholder: "Palacio Real 19",
    },
    {
      name: "comuna_cliente",
      label: "Comuna",
      type: "text",
      // required: true,
      placeholder: "Centro",
    },
    {
      name: "region_cliente",
      label: "Región",
      type: "text",
      // required: true,
      placeholder: "Planeta Alderaan",
    },
    {
      name: "telefono_cliente",
      label: "Teléfono",
      type: "text",
      // required: true,
      placeholder: "931274718",
    },
    {
      name: "email_cliente",
      label: "Correo Electrónico",
      type: "email",
      // required: true,
      placeholder: "leiaorgana@gmail.com",
    },
    {
      name: "comprobanteImg_url",
      label: "Comprobante",
      type: "file",
      accept: "image/*",
      // required: true,
    },
  ];

  return (
    <div>
      <Formulario
        titulo="Realizar compra y Rellenar datos de envío"
        mensaje={
          <div>
            <h3>Datos Bancarios</h3>
            <p><strong>Nombre:</strong> Mazmorra Kawaii</p>
            <p><strong>RUT:</strong> 20.967.824-1</p>
            <p><strong>Tipo de cuenta:</strong> Cuenta Corriente</p>
            <p><strong>Nro Cuenta:</strong> 0 000 75 46009 0</p>
            <p><strong>Banco:</strong> Banco Santander</p>
            <p><strong>Mail:</strong> mazmorrakawaii@gmail.com</p>
          </div>
        }
        fields={fields}
      />
    </div>
  );
  
  
  
  
};

export default Compra;

//este es el form post poner realizar compra, se trae el componente de formulario.
// PaginaEnvios.jsx
import React from 'react';
import Formulario from '../../component/form';
import '../../../styles/form.css';

const Envios = () => {
  const fields = [
    { name: 'nombre_cliente', label: 'Nombre del Cliente', type: 'text', required: true },
    { name: 'direccion_cliente', label: 'Dirección', type: 'text', required: true },
    { name: 'comuna_cliente', label: 'Comuna', type: 'text', required: true },
    { name: 'region_cliente', label: 'Región', type: 'text', required: true },
    { name: 'telefono_cliente', label: 'Teléfono', type: 'tel', required: true, placeholder: '9 31274718' },
    { name: 'email_cliente', label: 'Correo Electrónico', type: 'email', required: true },
  ];

  const handleSubmit = (formData) => {
    console.log('Datos del formulario de Envíos:', formData);
    // Lógica para enviar los datos a la base de datos
  };

  return (
    <div>
      <Formulario
        titulo="Datos de envíos"
        mensaje="Para que tu compra llegue a tu destino, por favor completa estos datos."
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Envios;

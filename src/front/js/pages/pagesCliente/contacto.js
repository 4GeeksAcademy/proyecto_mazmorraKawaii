//aqui el formulario para que las personas puedan contactar x dudas o problemas, se trae el componente.
// PaginaContacto.jsx
import React from 'react';
import Formulario from '../../component/form';
import '../../../styles/form.css';

const Contacto = () => {
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Correo Electrónico', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'tel', required: true, placeholder: '9 31274718' },
    { name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true },
  ];

  const handleSubmit = (formData) => {
    console.log('Datos del formulario de Contacto:', formData);
    // Lógica para enviar los datos a la base de datos
  };

  return (
    <div>
      <Formulario
        titulo="Contacto"
        mensaje="En Mazmorra Kawaii queremos que resuelvas todas tus dudas o nos comentes si tuviste algún problema, escribe con confianza."
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Contacto;

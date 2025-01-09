//aqui el formulario para que las personas puedan contactar x dudas o problemas, se trae el componente.
import React from 'react';
import Formulario from '../../component/form';
import '../../../styles/form.css';

const Contacto = () => {
  const fields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Correo Electrónico', type: 'email', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'text', required: true, placeholder: '9 87654321' },
    { name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true },
  ];

  const handleSubmit = (formData) => {
    console.log('Datos del formulario de Contacto enviados:', formData);
    // ver q mas poner
  };

  return (
    <div>
      <Formulario
        titulo="Contacto"
        mensaje="En Mazmorra Kawaii queremos que resuelvas todas tus dudas o nos comentes si tuviste algún problema, escribe con confianza."
        fields={fields}
        onSubmit={handleSubmit}
        endpoint="/contacto" 
      />
    </div>
  );
};

export default Contacto;

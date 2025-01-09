//aqui el formulario para que las personas puedan contactar x dudas o problemas, se trae el componente.
import React from 'react';
import Formulario from '../../component/form';
import '../../../styles/form.css';

const Contacto = () => {
  const fields = [
    { name: 'nombre', label: 'Nombre y Apellido', type: 'text', required: true, placeholder: 'Ejemplo: Frodo Bolsón' },
    { name: 'email', label: 'Correo Electrónico', type: 'email', required: true, placeholder:'Ejemplo: frodo@mail.com'},
    { name: 'telefono', label: 'Teléfono', type: 'text', required: true, placeholder: '9 1234567' },
    { name: 'mensaje', label: 'Mensaje', type: 'textarea', required: true, placeholder: 'Deja tu mensaje'},
  ];

  const handleSubmit = (formData) => {
    console.log('Datos del formulario de Contacto enviados:', formData);
    alert('Mensaje enviado! Gracias por contactarse');
    document.getElementById('contact-form').reset(); //limpia campos
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

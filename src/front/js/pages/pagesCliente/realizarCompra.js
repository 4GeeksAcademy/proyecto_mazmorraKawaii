//este es el form post poner realizar compra, se trae el componente de formulario.
import React from 'react';
import Formulario from '../../component/form';
import '../../../styles/form.css';

const Compra = () => {
  const fields = [
    { name: 'nombre_cliente', label: 'Nombre del Cliente', type: 'text', required: true, placeholder: 'Leia Organa' },
    { name: 'direccion_cliente', label: 'Dirección', type: 'text', required: true,  placeholder: 'Palacio Real 19'},
    { name: 'comuna_cliente', label: 'Comuna', type: 'text', required: true , placeholder: 'Centro'},
    { name: 'region_cliente', label: 'Región', type: 'text', required: true , placeholder: 'planeta Alderaan'},
    { name: 'telefono_cliente', label: 'Teléfono', type: 'text', required: true, placeholder: '9 31274718' },
    { name: 'email_cliente', label: 'Correo Electrónico', type: 'email', required: true, placeholder: 'leiaorgana@gmail.com' },
    { name: 'comprobanteImg_url', label: 'Comprobante', type:'', required: true},
  ];

  const handleSubmit = (formData) => {
    console.log('Datos del formulario de Envíos:', formData);
    // Lógica para enviar los datos a la base de datos
  };

  return (
    <div>
      <Formulario
        titulo="Realizar compra y Rellenar datos de envío"
        mensaje="Tal y como dice en informaciones, para validar tu compra deberás poner tu comprobante de transferencia, ya que por el momento solo tenemos ese método de pago, recuerda rellenar tus datos de envío"
        fields={fields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Compra;

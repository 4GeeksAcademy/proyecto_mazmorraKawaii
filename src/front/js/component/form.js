import React from 'react';
import apiClient from '../api/index.jsx'; 
const Formulario = ({ titulo, mensaje, fields, onSubmit, endpoint }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {};
    fields.forEach(field => {
      formData[field.name] = event.target[field.name].value;
    });
    try {
      const response = await apiClient.post(endpoint, formData); // Enviar dato endpoint
      console.log('Datos enviados exitosamente:', response.data);
      onSubmit(response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="form-page">
      <div className="container py-5">
        <h1 className="text-center mb-5">{titulo}</h1>
        <p className="text-center mb-4">{mensaje}</p>
        <form onSubmit={handleSubmit}>
          {fields.map(field => (
            <div key={field.name} className="form-group mb-3">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="form-control"
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;

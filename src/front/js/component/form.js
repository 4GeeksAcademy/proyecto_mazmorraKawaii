import React from 'react';

const Formulario = ({ titulo, mensaje, fields, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {};
    fields.forEach(field => {
      formData[field.name] = event.target[field.name].value;
    });
    onSubmit(formData);
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

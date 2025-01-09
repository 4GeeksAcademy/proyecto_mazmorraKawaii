import React from 'react';
import '../../styles/card.css';

const Card = ({ titulo, descripcion, precio, tiempo_juego, modalidad, categoria, imagen_url, onAddToCart }) => {
  return (
    <div className="card">
      <img src={imagen_url} className="card-img-top" alt={titulo} />
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text"><strong>Precio:</strong> ${precio.toFixed(2)}</p>
        <p className="card-text"><strong>Tiempo de Juego:</strong> {tiempo_juego}</p>
        <p className="card-text"><strong>Modalidad:</strong> {modalidad}</p>
        <p className="card-text"><strong>Categoría:</strong> {categoria}</p>
        <button className="btn btn-primary add-to-cart" onClick={onAddToCart}>Añadir al Carrito</button>
      </div>
    </div>
  );
};

export default Card;

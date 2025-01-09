import React from 'react';
import '../../styles/card.css';

const Card = ({ titulo, descripcion, precio, tiempo_juego, modalidad, categoria, imagen_url, onAddToCart }) => {

  const handleAddToCart = () => {
    // obj juego
    const juego = {
      titulo,
      descripcion,
      precio,
      tiempo_juego,
      modalidad,
      categoria,
      imagen_url
    };

    // obtener el carrito actual desde localStorage
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];

    // añadir el nuevo juego al carrito
    const nuevoCarrito = [...carritoActual, juego];

    // guardar el nuevo carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));

    // llamar la función de callback onAddToCart
    if (onAddToCart) {
      onAddToCart();
    }

    // Mostrar un mensaje de confirmación (opcional)
    alert('¡Juego añadido al carrito!');
  };

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
      </div>
      <div className="card-footer">
        <button className="btn btn-primary add-to-cart" onClick={handleAddToCart}>Añadir al Carrito</button>
      </div>
    </div>
  );
};

export default Card;

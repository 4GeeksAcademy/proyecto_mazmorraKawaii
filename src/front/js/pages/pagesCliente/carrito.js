import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/index.jsx'; //ver por que no lo toma
import '../../../styles/carrito.css';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar la información del carrito desde localStorage
    const carritoLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoConCantidad = carritoLocalStorage.map(item => ({
      ...item,
      cantidad: item.cantidad || 1  // Establece la cantidad a 1 
    }));
    setCarrito(carritoConCantidad);
  }, []);

  const handleRemoveFromCart = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const handleQuantityChange = (index, quantity) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = quantity;
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };
  const handleFinalizarCompra = () => {
    navigate('/Compra'); // Navegar a la página de realizar compra 
   };

  if (carrito.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>¡Ups! Parece que no tienes nada en el carrito.</h2>
        <p>Visita la sección de productos para que puedas comprar.</p>
      </div>
    );
  }

  return (
    <div className="carrito">
      <h1 className="titulo">Carrito</h1>
      <div className="carrito-contenedor">
        <div className="carrito-cabecera">
          <span>Producto</span>
          <span>Precio</span>
          <span>Cantidad</span>
        </div>
        {carrito.map((item, index) => (
          <div key={index} className="carrito-item">
            <FaTrash className="icon-trash" onClick={() => handleRemoveFromCart(index)} />
            <img src={item.imagen_url} alt={item.titulo} className="carrito-imagen" />
            <span className="carrito-titulo">{item.titulo}</span>
            <span className="carrito-precio">${item.precio.toFixed(2)}</span>
            <input
              type="number"
              value={item.cantidad}
              min="1"
              className="carrito-cantidad"
              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
            />
          </div>
        ))}
      </div>
      <div className="carrito-total">
        <h3>Total: ${calcularTotal().toFixed(2)}</h3>
        <button className="btn-finalizar" onClick={handleFinalizarCompra}>Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Carrito;

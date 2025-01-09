// Home.jsx
import React, { useEffect, useState } from 'react';
import Card from '../../component/card';
import '../../../styles/home.css';
import portada from '../../../img/portada.png';
import apiClient from './../../api/index.jsx';

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(async() => {
    // Fetch data from the API for featured products and set the state
    const response = await apiClient.get('/juegos');
    setDestacados(response.data);
  }, []);

  const handleAddToCart = (juegoId) => {
    console.log(`Añadir al carrito el juego con ID: ${juegoId}`);
    // Lógica para añadir el juego al carrito
  };

  return (
    <div className="home-page">
      <div className="carousel-container">
        <img src={portada} alt="Portada" className="carousel-image" />
      </div>
      
      <div className="container py-5">
        <h2 className="text-center mb-5">Productos Destacados</h2>
        <div className="grid-container">
          {destacados.map(juego => (
            <Card
              key={juego.id}
              titulo={juego.titulo}
              descripcion={juego.descripcion}
              precio={juego.precio}
              tiempo_juego={juego.tiempo_juego}
              modalidad={juego.modalidad}
              categoria={juego.categoria}
              imagen_url={juego.imagen_url}
              onAddToCart={() => handleAddToCart(juego.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

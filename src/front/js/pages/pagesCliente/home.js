import React, { useEffect, useState } from 'react';
import Card from '../../component/card';
import '../../../styles/home.css';
import portada from '../../../img/portada.png';
import apiClient from './../../api/index.jsx';

const Home = () => {
  const [juegos, setJuegos] = useState([]);
  const [filtros, setFiltros] = useState({
    modalidad: '',
    categoria: '',
    tiempo_juego: ''
  });

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await apiClient.get('/juegos');
        setJuegos(response.data);
      } catch (error) {
        console.error('Error fetching juegos:', error);
      }
    };

    fetchJuegos(); // Call the asynchronous function
  }, []);

  const handleFiltroChange = (event) => {
    const { name, value } = event.target;
    setFiltros({
      ...filtros,
      [name]: value
    });
  };

  const juegosFiltrados = juegos.filter(juego => {
    return (
      (filtros.modalidad === '' || juego.modalidad === filtros.modalidad) &&
      (filtros.categoria === '' || juego.categoria === filtros.categoria) &&
      (filtros.tiempo_juego === '' || juego.tiempo_juego === filtros.tiempo_juego)
    );
  });

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
        <h2 className="text-center mb-5">Catalogo de productos</h2>
        <div className="filtros mb-5">
          <div className="form-group">
            <label htmlFor="modalidad">Modalidad</label>
            <select name="modalidad" id="modalidad" className="form-control" value={filtros.modalidad} onChange={handleFiltroChange}>
              <option value="">Todas</option>
              <option value="colaborativo">Colaborativo</option>
              <option value="competitivo">Competitivo</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select name="categoria" id="categoria" className="form-control" value={filtros.categoria} onChange={handleFiltroChange}>
              <option value="">Todas</option>
              <option value="juego_de_mesa">Juego de Mesa</option>
              <option value="rol">Rol</option>
              <option value="tcg">TCG</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tiempo_juego">Tiempo de Juego</label>
            <select name="tiempo_juego" id="tiempo_juego" className="form-control" value={filtros.tiempo_juego} onChange={handleFiltroChange}>
              <option value="">Todos</option>
              <option value="corto">Corto</option>
              <option value="largo">Largo</option>
            </select>
          </div>
        </div>

        <div className="grid-container">
          {juegosFiltrados.map(juego => (
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

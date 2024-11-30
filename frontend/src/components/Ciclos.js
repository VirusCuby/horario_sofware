import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Ciclos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons';

const Ciclos = () => {
  const [ciclos, setCiclos] = useState([]);
  const [nuevoCiclo, setNuevoCiclo] = useState('');

  useEffect(() => {
    const fetchCiclos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/ciclos');
        setCiclos(response.data);
      } catch (error) {
        console.error('Error al cargar ciclos:', error.response?.data?.message || error.message);
      }
    };
    fetchCiclos();
  }, []);

  const handleCrearCiclo = async () => {
    if (!nuevoCiclo.trim()) return alert('Escribe un nombre válido para el ciclo');
    try {
      const response = await axios.post('http://localhost:5000/api/ciclos', { nombre: nuevoCiclo });
      setCiclos([...ciclos, response.data]);
      setNuevoCiclo('');
    } catch (error) {
      console.error('Error al crear ciclo:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="ciclos-container">
      <h1 className="title">Gestionar Ciclos</h1>
      <div className="form-group">
        <input
          type="text"
          className="input"
          placeholder="Escribe el nombre del ciclo"
          value={nuevoCiclo}
          onChange={(e) => setNuevoCiclo(e.target.value)}
        />
        <button className="btn btn-create" onClick={handleCrearCiclo}>
          <FontAwesomeIcon icon={faPlus} /> Crear Ciclo
        </button>
      </div>
      <h2 className="subtitle">Lista de Ciclos</h2>
      <ul className="ciclos-list">
        {ciclos.map((ciclo) => (
          <li key={ciclo.id} className="ciclo-item">
            {ciclo.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ciclos;

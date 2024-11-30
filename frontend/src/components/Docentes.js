import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Docentes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

const Docentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [nuevoDocente, setNuevoDocente] = useState({ nombre: '', prioridad: 1, horas_disponibles: 0 });

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/docentes');
        setDocentes(response.data);
      } catch (error) {
        console.error('Error al obtener docentes:', error.response?.data?.message || error.message);
      }
    };
    fetchDocentes();
  }, []);

  const handleCrearDocente = async () => {
    if (!nuevoDocente.nombre.trim()) {
      alert('El nombre del docente es obligatorio');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/docentes', nuevoDocente);
      setDocentes([...docentes, response.data]);
      setNuevoDocente({ nombre: '', prioridad: 1, horas_disponibles: 0 });
    } catch (error) {
      console.error('Error al crear docente:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="docentes-container">
      <h1 className="title">Gestionar Docentes</h1>

      {/* Lista de Docentes */}
      <div className="docentes-list">
        {docentes.map((docente) => (
          <div key={docente.id} className="docente-card">
            <FontAwesomeIcon icon={faUser} className="docente-icon" />
            <h3>{docente.nombre}</h3>
            <p>Prioridad: {docente.prioridad}</p>
            <p>Horas Disponibles: {docente.horas_disponibles}</p>
          </div>
        ))}
      </div>

      {/* Formulario para agregar docente */}
      <div className="form-container">
        <h2>Agregar Docente</h2>
        <input
          type="text"
          className="form-input"
          placeholder="Nombre"
          value={nuevoDocente.nombre}
          onChange={(e) => setNuevoDocente({ ...nuevoDocente, nombre: e.target.value })}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Prioridad"
          value={nuevoDocente.prioridad}
          onChange={(e) => setNuevoDocente({ ...nuevoDocente, prioridad: e.target.value })}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Horas Disponibles"
          value={nuevoDocente.horas_disponibles}
          onChange={(e) => setNuevoDocente({ ...nuevoDocente, horas_disponibles: e.target.value })}
        />
        <button className="btn btn-create" onClick={handleCrearDocente}>
          <FontAwesomeIcon icon={faPlus} /> Crear Docente
        </button>
      </div>
    </div>
  );
};

export default Docentes;

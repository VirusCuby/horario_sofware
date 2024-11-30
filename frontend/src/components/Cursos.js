import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cursos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';

const Cursos = () => {
  const [cicloId, setCicloId] = useState('');
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({ nombre: '', horas: 0 });

  const handleBuscarCursos = async () => {
    if (!cicloId.trim()) {
      alert('Por favor, ingresa el ID del ciclo');
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/cursos/${cicloId}`);
      setCursos(response.data);
    } catch (error) {
      console.error('Error al buscar cursos:', error.response?.data?.message || error.message);
    }
  };

  const handleCrearCurso = async () => {
    if (!nuevoCurso.nombre.trim() || !nuevoCurso.horas) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/cursos', {
        ...nuevoCurso,
        ciclo_id: cicloId,
      });
      setCursos([...cursos, response.data]);
      setNuevoCurso({ nombre: '', horas: 0 });
    } catch (error) {
      console.error('Error al crear curso:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="cursos-container">
      <h1 className="title">Gestionar Cursos</h1>

      {/* Buscar Cursos */}
      <div className="buscar-container">
        <input
          type="text"
          className="input"
          placeholder="ID del Ciclo"
          value={cicloId}
          onChange={(e) => setCicloId(e.target.value)}
        />
        <button className="btn btn-search" onClick={handleBuscarCursos}>
          <FontAwesomeIcon icon={faSearch} /> Buscar Cursos
        </button>
      </div>

      {/* Lista de Cursos */}
      <h2 className="subtitle">Cursos Registrados</h2>
      <div className="cursos-list">
        {cursos.map((curso) => (
          <div key={curso.id} className="curso-card">
            <FontAwesomeIcon icon={faBook} className="curso-icon" />
            <h3>{curso.nombre}</h3>
            <p>{curso.horas} horas</p>
          </div>
        ))}
      </div>

      {/* Agregar Curso */}
      <div className="form-container">
        <h2>Agregar Curso</h2>
        <input
          type="text"
          className="form-input"
          placeholder="Nombre del Curso"
          value={nuevoCurso.nombre}
          onChange={(e) => setNuevoCurso({ ...nuevoCurso, nombre: e.target.value })}
        />
        <input
          type="number"
          className="form-input"
          placeholder="Horas del Curso"
          value={nuevoCurso.horas}
          onChange={(e) => setNuevoCurso({ ...nuevoCurso, horas: e.target.value })}
        />
        <button className="btn btn-create" onClick={handleCrearCurso}>
          <FontAwesomeIcon icon={faPlus} /> Crear Curso
        </button>
      </div>
    </div>
  );
};

export default Cursos;

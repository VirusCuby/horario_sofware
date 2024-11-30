import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Horarios.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faClock, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';

const Horarios = () => {
  const [cicloId, setCicloId] = useState('');
  const [horarios, setHorarios] = useState([]);
  const [nuevoHorario, setNuevoHorario] = useState({
    docente_id: '',
    curso_id: '',
    dia: '',
    hora_inicio: '',
    hora_fin: '',
  });

  const handleBuscarHorarios = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/horarios/${cicloId}`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error al buscar horarios:', error.response?.data?.message || error.message);
    }
  };

  const handleAsignarHorario = async () => {
    if (!nuevoHorario.docente_id || !nuevoHorario.curso_id || !nuevoHorario.dia) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/horarios', nuevoHorario);
      setHorarios([...horarios, response.data]);
      setNuevoHorario({ docente_id: '', curso_id: '', dia: '', hora_inicio: '', hora_fin: '' });
    } catch (error) {
      console.error('Error al asignar horario:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="horarios-container">
      <h1 className="title">Gestionar Horarios</h1>

      {/* Buscar Horarios */}
      <div className="buscar-container">
        <input
          type="text"
          className="input"
          placeholder="ID del Ciclo"
          value={cicloId}
          onChange={(e) => setCicloId(e.target.value)}
        />
        <button className="btn btn-search" onClick={handleBuscarHorarios}>
          <FontAwesomeIcon icon={faSearch} /> Buscar Horarios
        </button>
      </div>

      {/* Tabla de Horarios */}
      <h2 className="subtitle">Horarios Registrados</h2>
      <table className="horarios-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Docente</th>
            <th>Curso</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario.id}>
              <td>{horario.dia}</td>
              <td>{horario.hora_inicio}</td>
              <td>{horario.hora_fin}</td>
              <td>{horario.docente_id}</td>
              <td>{horario.curso_id}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Asignar Horario */}
      <div className="form-container">
        <h2>Asignar Horario</h2>
        <input
          type="text"
          className="form-input"
          placeholder="ID del Docente"
          value={nuevoHorario.docente_id}
          onChange={(e) => setNuevoHorario({ ...nuevoHorario, docente_id: e.target.value })}
        />
        <input
          type="text"
          className="form-input"
          placeholder="ID del Curso"
          value={nuevoHorario.curso_id}
          onChange={(e) => setNuevoHorario({ ...nuevoHorario, curso_id: e.target.value })}
        />
        <input
          type="text"
          className="form-input"
          placeholder="Día"
          value={nuevoHorario.dia}
          onChange={(e) => setNuevoHorario({ ...nuevoHorario, dia: e.target.value })}
        />
        <input
          type="time"
          className="form-input"
          placeholder="Hora Inicio"
          value={nuevoHorario.hora_inicio}
          onChange={(e) => setNuevoHorario({ ...nuevoHorario, hora_inicio: e.target.value })}
        />
        <input
          type="time"
          className="form-input"
          placeholder="Hora Fin"
          value={nuevoHorario.hora_fin}
          onChange={(e) => setNuevoHorario({ ...nuevoHorario, hora_fin: e.target.value })}
        />
        <button className="btn btn-assign" onClick={handleAsignarHorario}>
          <FontAwesomeIcon icon={faCalendarPlus} /> Asignar Horario
        </button>
      </div>
    </div>
  );
};

export default Horarios;

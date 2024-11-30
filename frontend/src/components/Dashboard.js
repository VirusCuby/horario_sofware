import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      {/* Header Fijo */}
      <header className="dashboard-header">
        <h1>Bienvenido, {auth.user?.email}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      {/* Menú Principal */}
      <main className="dashboard-menu">
        <button className="menu-item" onClick={() => navigate('/ciclos')}>
          Gestionar Ciclos
        </button>
        <button className="menu-item" onClick={() => navigate('/cursos')}>
          Gestionar Cursos
        </button>
        <button className="menu-item" onClick={() => navigate('/docentes')}>
          Gestionar Docentes
        </button>
        <button className="menu-item" onClick={() => navigate('/horarios')}>
          Gestionar Horarios
        </button>
      </main>
    </div>
  );
};

export default Dashboard;

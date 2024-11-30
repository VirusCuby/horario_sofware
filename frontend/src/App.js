import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Ciclos from './components/Ciclos';
import Cursos from './components/Cursos';
import Docentes from './components/Docentes';
import Horarios from './components/Horarios';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/ciclos"
          element={
            <PrivateRoute>
              <Ciclos />
            </PrivateRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <PrivateRoute>
              <Cursos />
            </PrivateRoute>
          }
        />
        <Route
          path="/docentes"
          element={
            <PrivateRoute>
              <Docentes />
            </PrivateRoute>
          }
        />
        <Route
          path="/horarios"
          element={
            <PrivateRoute>
              <Horarios />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

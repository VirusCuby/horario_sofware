import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      login(response.data.token, { email });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="login-card">
        <h2 className="text-center mb-4">INGRESO AL SISTEMA</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3 password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="input-group-text toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            INGRESAR
          </button>
        </form>
        <p className="text-center mt-3">
          ¿Olvidaste tu contraseña? <a href="/forgot-password">Restáurala ahora.</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

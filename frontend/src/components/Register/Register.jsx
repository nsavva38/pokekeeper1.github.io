import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import api from '../api'; // imports the centralized API

const Register = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await api.post('/register', { username, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', username); // Store the username
        // Set the token in Axios default headers
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        setIsAuthenticated(true); // Set authentication status
        navigate('/Account'); // Navigate to the protected Account page
      } else {
        alert('Registration successful, please log in.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.response?.data?.error || 'An error occurred during registration.'); // Set error message from backend
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Conditionally render error message */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;

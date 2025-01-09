/* import React, { useState } from 'react';
import { loginAdmin } from '../../api/index'; // Importar desde api
import '../../../styles/login.css'; 
import emailjs from "@emailjs/browser"

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {   //falta liberia de emailjs creo e instalar
    e.preventDefault();
    loginAdmin(email, password)
      .then(response => {
        alert('Login successful!'); // Guarda el token y redirige al dashboard
        
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('Invalid credentials.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <br />
      <button type="submit">Login</button>
      <br />
      <a href="/request_reset">Forgot Password?</a>
    </form>
  );
}

export default AdminLogin; */

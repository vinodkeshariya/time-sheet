import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      onLogin();
      // Redirect to success page after successful login
      history.push('/success');
    } catch (err) {
      console.error(err);
      setLoginError('Invalid username or password');
    }
  };

  return (
    <div> 
       <div className='container'>
      {showSuccessMessage && <p>Login successful!</p>}
      
      <form className='login' onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {loginError && <p>{loginError}</p>}
      </form>
      </div>
    </div>
  );
};

export default LoginForm;

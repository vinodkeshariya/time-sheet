import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', { username, password });
      const token = response.data.token;
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      onLogin();
      setShowSuccessMessage(true); // Set success message
      // Redirect to success page after successful login
      history.push('/success');
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setLoginError(err.response.data.message || 'Invalid username or password');
      } else {
        setLoginError('An error occurred. Please try again.');
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-form'> 
      <div className='container'>
        {showSuccessMessage && <p>Login successful!</p>}
        <div className='title'>
          <h2>LOGIN</h2>
        </div>
        <form className='login' onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="password-toggle-icon" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <div className='d-flex'>
            <label>
              <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember Me
            </label>
            <h3><a href="/forgot-password">Forgot Password?</a></h3>
          </div>
          <button type="submit">Login</button> 
          <div className="text">
            <h3>Don't have an account? <a href="/registration">Register now</a></h3>
          </div>
          {loginError && <p>{loginError}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

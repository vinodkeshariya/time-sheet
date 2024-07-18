import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setPasswordMatchError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', formData);
      console.log('User registered:', response.data);
      // Handle success (e.g., display a success message, redirect to login)
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors (e.g., display an error message)
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='reg-form'>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name"></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="username"></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="password-container">
            <label htmlFor="password"></label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <span className="password-toggle-icon" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="password-container">
            <label htmlFor="confirmPassword"></label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match</p>}
            <span className="password-toggle-icon" onClick={toggleShowPassword}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <button type="submit">Register Now</button>
          <div className="text">
            <h3>Already have an account? <a href="/login">Login now</a></h3>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
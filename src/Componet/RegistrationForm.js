import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission success
    // Replace this with actual form submission logic
    setTimeout(() => {
      setSuccessMessage('Registration successful. Redirecting to login page...');
      // Clear form data
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }, 1000);
  };

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
      {successMessage && <p>{successMessage}</p>}
     
    </form>
    </div>
  );
};

export default RegistrationForm;

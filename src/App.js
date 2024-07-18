import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from './Componet/LoginForm'; // Corrected path
import RegistrationForm from './Componet/RegistrationForm'; // Corrected path
import logo from './image/icons8-timesheet-48.png';
import TimeSheet from './Componet/Timesheet';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className='home-page'>
        
        <div className='navbar'><div className='main-logo'>
            <img src={logo} alt="Timesheet Application Logo" />
            <div className='title'>
              <h1>React Timesheet</h1>
            </div>
           </div>
           </div>
           <div className='container'>
          
      
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/registration">Registration</Link>
                </li>
                <li>
                  <Link to="/timesheet">TimeSheet</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <Switch>
          <Route exact path="/login">
            <LoginForm onLogin={handleLogin} />
          </Route>
          <Route path="/registration">
            <RegistrationForm />
          </Route>
          <Route path="/timesheet">
            <TimeSheet/>
          </Route>
        </Switch>
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </Router>
  );
};

export default App;

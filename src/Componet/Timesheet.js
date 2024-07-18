import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Timesheet() {
  const [timesheetData, setTimesheetData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [newEntry, setNewEntry] = useState({
    projectName: '',
    description: '',
    time: '',
    date: '',
    developerName: ''
  });

  useEffect(() => {
    // Fetch timesheet data
    axios.get('/api/time-sheet')
      .then((response) => {
        setTimesheetData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch project names
    axios.get('/api/projects')
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/time-sheet', newEntry)
      .then((response) => {
        setTimesheetData([...timesheetData, response.data]);
        setNewEntry({ projectName: '', description: '', time: '', date: '', developerName: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/time-sheet/${id}`)
      .then(() => {
        setTimesheetData(timesheetData.filter((entry) => entry._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='timesheet'>
      <div className='container'>
      <h1>Timesheet</h1>
      <form onSubmit={handleSubmit}>
        <div className='input-item'>
        <label>Project Name:</label>
        <select name="projectName" value={newEntry.projectName} onChange={handleChange}>
          <option value="">Select a project</option>
          <option value="">project</option>
          {projects.map((project) => (
            <option key={project._id} value={project.name}>{project.name}</option>
          ))}
        </select>
        </div>
        <br />
        <div className='input-item'>
       <label>Description:</label>
        <textarea name="description" value={newEntry.description} onChange={handleChange} placeholder="Enter description" />
        </div>
        
        <br />
        <div className='input-item'>
        <label>Time:</label>
        <input type="text" name="time" value={newEntry.time} onChange={handleChange} placeholder="Enter time (e.g., 3 hours)" />
        </div>
        
        <br />
        <div className='input-item'>
        <label>Date:</label>
        <input type="date" name="date" value={newEntry.date} onChange={handleChange} />
        </div>
        
        <br />
        <div className='input-item'>
        <label>Developer Name:</label>
        <input type="text" name="developerName" value={newEntry.developerName} onChange={handleChange} placeholder="Enter developer name" />
        </div>
        
        <br />
        <button type="submit">Add Entry</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Time</th>
            <th>Date</th>
            <th>Developer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheetData.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.projectName}</td>
              <td>{entry.description}</td>
              <td>{entry.time}</td>
              <td>{entry.date}</td>
              <td>{entry.developerName}</td>
              <td>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Timesheet;

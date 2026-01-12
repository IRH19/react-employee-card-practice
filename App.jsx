import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import TeamDashboard from './TeamDashboard';
import EmployeeDetails from './EmployeeDetails';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee'; // Import the new page

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<TeamDashboard />} />
          <Route path="/employee/:name" element={<EmployeeDetails />} />
          <Route path="/add" element={<AddEmployee />} />
          
          {/* New Route for Editing */}
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

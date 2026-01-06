import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import our components
import EmployeeCard from './EmployeeCard';
import Navbar from './Navbar';
import About from './About';
import EmployeeDetails from './EmployeeDetails';

// Simple Home Page Component
function TeamPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>AddSolTech Team</h1>
      <EmployeeCard name="Sarah Smith" role="Frontend Developer" />
      <EmployeeCard name="Mike Ross" role="Backend Lead" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Navbar stays visible on all pages */}
      <Navbar />
      
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<TeamPage />} />
        
        {/* Dynamic Route for Employee Details */}
        <Route path="/employee/:name" element={<EmployeeDetails />} />
        
        {/* About Page */}
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

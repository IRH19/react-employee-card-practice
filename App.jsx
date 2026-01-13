import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import TeamDashboard from './TeamDashboard';
import EmployeeDetails from './EmployeeDetails';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import Login from './Login'; // Import Login

// A "Guard" component to check if we have a token
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
}

function App() {
  // Check if we are logged in to decide showing Navbar
  // (In a simple way, we just render it inside the routes or leave it global)
  
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* 1. Public Route: Login Page */}
          <Route path="/" element={<Login />} />

          {/* 2. Protected Routes (Must have Token) */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Navbar />
              <TeamDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/add" element={
            <PrivateRoute>
              <Navbar />
              <AddEmployee />
            </PrivateRoute>
          } />

          <Route path="/employee/:name" element={
            <PrivateRoute>
              <Navbar />
              <EmployeeDetails />
            </PrivateRoute>
          } />

          <Route path="/edit/:id" element={
            <PrivateRoute>
              <Navbar />
              <EditEmployee />
            </PrivateRoute>
          } />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


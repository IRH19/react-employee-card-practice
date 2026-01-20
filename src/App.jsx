import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import TeamDashboard from './TeamDashboard';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmployeeDetails from './EmployeeDetails';
import Login from './Login';

// GUARD: Only lets you pass if a token exists
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  // If no token, kick them back to "/" (Login)
  return token ? children : <Navigate to="/" />;
}

// LAYOUT: Wraps pages that need the Navbar
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Public Route: Login */}
        <Route path="/" element={<Login />} />

        {/* 2. Protected Routes (Wrapped in Layout + PrivateRoute) */}
        
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Layout>
              <TeamDashboard />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/add" element={
          <PrivateRoute>
            <Layout>
              <AddEmployee />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/employee/:name" element={
          <PrivateRoute>
            <Layout>
              <EmployeeDetails />
            </Layout>
          </PrivateRoute>
        } />

        <Route path="/edit/:id" element={
          <PrivateRoute>
            <Layout>
              <EditEmployee />
            </Layout>
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;


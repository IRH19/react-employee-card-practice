import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';

function TeamDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:5108/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '2.5rem', 
        textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' 
      }}>
        Team Overview
      </h1>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#ccc' }}>Connecting to SQL Server...</div>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '30px', 
          justifyContent: 'center' 
        }}>
          {employees.map(emp => (
            <EmployeeCard 
              key={emp.id}
              id={emp.id}
              name={emp.name}
              role={emp.role}
              status={emp.status}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamDashboard;

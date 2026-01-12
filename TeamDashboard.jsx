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
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(error => console.error("Error:", error));
  };

  // This function removes the deleted person from the screen immediately
  const handleEmployeeDeleted = (deletedId) => {
    setEmployees(employees.filter(emp => emp.id !== deletedId));
  };

  if (loading) return <h2 style={{ padding: '20px', color: '#ffcc00' }}>⚠️ Loading Team...</h2>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Team Dashboard</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {employees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            id={employee.id} // We pass the ID now so we can edit/delete
            name={employee.name} 
            role={employee.role} 
            status={employee.status}
            onDelete={handleEmployeeDeleted} // Pass the delete function down
          />
        ))}
      </div>
    </div>
  );
}

export default TeamDashboard;

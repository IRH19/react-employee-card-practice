import React, { useEffect, useState, useMemo } from 'react';
import EmployeeCard from './EmployeeCard';
import CommandBar from './CommandBar';

function TeamDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. ADVANCED STATE: Managing filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  // 2. THE LOGIC ENGINE (useMemo)
  // This only runs when 'searchTerm', 'statusFilter', or 'employees' changes.
  // It's much more efficient than filtering inside the return().
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      // Filter 1: Name match (Case insensitive)
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter 2: Status match
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '20px', 
        fontSize: '2.5rem', 
        textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' 
      }}>
        Team Overview
      </h1>

      {/* 3. The New Control Panel */}
      <CommandBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        count={filteredEmployees.length}
        total={employees.length}
      />

      {loading ? (
        <div style={{ textAlign: 'center', color: '#ccc' }}>Connecting to SQL Server...</div>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '30px', 
          justifyContent: 'center' 
        }}>
          {/* 4. Display Logic: Show list OR Empty State */}
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map(emp => (
              <EmployeeCard 
                key={emp.id}
                id={emp.id}
                name={emp.name}
                role={emp.role}
                status={emp.status}
                onDelete={handleDelete}
              />
            ))
          ) : (
            // The "Advanced" Empty State (UX Best Practice)
            <div className="glass" style={{ padding: '40px', textAlign: 'center', opacity: 0.7 }}>
              <h3>🔍 No employees found</h3>
              <p>Try adjusting your filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeamDashboard;

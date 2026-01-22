import React, { useEffect, useState, useMemo } from 'react';
import EmployeeCard from './EmployeeCard';
import CommandBar from './CommandBar';
import StatsChart from './StatsChart';
import RoleChart from './RoleChart';
import SkeletonCard from './SkeletonCard'; // Import the Shimmer Loader

function TeamDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. STATE: Managing filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    // Artificial delay to show off the Skeleton loader (remove setTimeout for real prod speed)
    // You can remove setTimeout and just keep fetchEmployees() if you want it instant.
    setTimeout(() => {
        fetchEmployees();
    }, 1500); 
  }, []);

  const fetchEmployees = () => {
    fetch('http://localhost:5108/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Stop loading even if error
      });
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // 2. THE LOGIC ENGINE (useMemo)
  // Filters the list based on search text AND dropdown status
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, statusFilter]);

  return (
    <div>
      <h1 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        fontSize: '2.5rem', 
        textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' 
      }}>
        Team Overview
      </h1>

      {/* 3. VISUAL ANALYTICS GRID (2 Columns) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Responsive Grid
        gap: '20px', 
        marginBottom: '20px' 
      }}>
         {/* Chart 1: Status Distribution */}
         <StatsChart employees={employees} />
         
         {/* Chart 2: Role Breakdown */}
         <RoleChart employees={employees} />
      </div>

      {/* 4. CONTROL PANEL (Search, Filter, Export) */}
      <CommandBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        statusFilter={statusFilter} 
        setStatusFilter={setStatusFilter}
        count={filteredEmployees.length}
        total={employees.length}
        employees={filteredEmployees} // Pass data for Export
      />

      {/* 5. EMPLOYEE GRID (With Skeleton Loading) */}
      {loading ? (
        // SHOW 4 SKELETONS WHILE LOADING
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        // SHOW REAL DATA
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
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
            // Empty State
            <div className="glass" style={{ padding: '40px', textAlign: 'center', opacity: 0.7, width: '100%' }}>
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

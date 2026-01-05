import React from 'react';
import EmployeeCard from './EmployeeCard';

function App() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>AddSolTech Team</h1>
      <EmployeeCard name="Sarah Smith" role="Frontend Developer" />
      <EmployeeCard name="Mike Ross" role="Backend Lead" />
    </div>
  );
}

export default App;

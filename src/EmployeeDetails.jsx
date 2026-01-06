import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const { name } = useParams(); // Grabs the name from the URL
  const [loading, setLoading] = useState(true); // Manages loading state

  // Simulate fetching data from a database
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 second delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <h2 style={{ padding: '40px', color: '#ffcc00' }}>⚠️ Fetching data for {name}...</h2>;
  }

  return (
    <div style={{ padding: '40px', border: '1px solid #ccc', margin: '20px', borderRadius: '10px' }}>
      <h1>👤 Employee Profile</h1>
      <hr />
      <h2>Name: {name}</h2>
      <p>Department: Engineering</p>
      <p><strong>Performance Score: 98%</strong></p>
      <br />
      <Link to="/" style={{ color: '#646cff', fontWeight: 'bold' }}>← Back to Dashboard</Link>
    </div>
  );
}

export default EmployeeDetails;

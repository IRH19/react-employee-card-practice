import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const { name } = useParams();
  const [backendData, setBackendData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ---------------------------------------------------------
    // IMPORTANT: REPLACE '5108' WITH YOUR MAGIC NUMBER FROM STEP 1
    // ---------------------------------------------------------
    fetch('http://localhost:5108/weatherforecast') 
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: '40px', color: '#ffcc00' }}>⚠️ Connecting to .NET Backend...</h2>;
  }

  return (
    <div style={{ padding: '40px', border: '1px solid #ccc', margin: '20px', borderRadius: '10px', textAlign: 'left' }}>
      <h1>🔗 Backend Connection Test</h1>
      <hr />
      <h2>Employee: {name}</h2>
      
      <h3>Data received from .NET API:</h3>
      {/* This block dumps the raw data so we can verify the connection */}
      <pre style={{ backgroundColor: '#222', padding: '10px', borderRadius: '5px' }}>
        {JSON.stringify(backendData, null, 2)}
      </pre>
      
      <br />
      <Link to="/" style={{ color: '#646cff', fontWeight: 'bold' }}>← Back to Dashboard</Link>
    </div>
  );
}

export default EmployeeDetails;

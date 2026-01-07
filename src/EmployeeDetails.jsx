import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetails() {
  const { name } = useParams();
  const [employee, setEmployee] = useState(null); // Store the data we get from API
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This is the REAL API call
    // We are fetching a random user (ID 1, 2, or 3) just to show it works
    const randomId = Math.floor(Math.random() * 10) + 1;

    fetch(`https://jsonplaceholder.typicode.com/users/${randomId}`)
      .then(response => response.json())
      .then(data => {
        setEmployee(data); // Save the real data
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2 style={{ padding: '40px', color: '#ffcc00' }}>⚠️ Connecting to External API...</h2>;
  }

  return (
    <div style={{ padding: '40px', border: '1px solid #ccc', margin: '20px', borderRadius: '10px', textAlign: 'left' }}>
      <h1>👤 Employee Profile (Live Data)</h1>
      <hr />
      {/* We display the Name from the URL, but other details come from the API */}
      <h2>Name: {name}</h2>
      
      <h3>Real Data from API:</h3>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>
      <p><strong>Website:</strong> {employee.website}</p>
      <p><strong>Company:</strong> {employee.company.name}</p>
      
      <br />
      <Link to="/" style={{ color: '#646cff', fontWeight: 'bold' }}>← Back to Dashboard</Link>
    </div>
  );
}

export default EmployeeDetails;

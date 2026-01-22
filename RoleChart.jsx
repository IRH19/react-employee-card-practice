import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

function RoleChart({ employees }) {
  // 1. ADVANCED LOGIC: Grouping Data
  // We take the raw list and count how many people have each "role"
  const processData = () => {
    const counts = {};
    employees.forEach(emp => {
      // Normalize role names (optional: could map "Intern" to "Developer")
      const role = emp.role || "Unknown"; 
      counts[role] = (counts[role] || 0) + 1;
    });

    // Convert object { "HR": 1, "Dev": 2 } into Array [{ name: "HR", val: 1 }, ...]
    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key]
    }));
  };

  const data = processData();
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a855f7'];

  return (
    <div className="glass" style={{ 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '300px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0' }}>💼 Roles Breakdown</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" tick={{fontSize: 12}} interval={0} />
          <YAxis stroke="#ccc" allowDecimals={false} />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.1)'}}
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RoleChart;

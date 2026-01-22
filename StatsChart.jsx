import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatsChart({ employees }) {
  // 1. ADVANCED LOGIC: Calculate counts dynamically
  const onlineCount = employees.filter(e => e.status === 'Online').length;
  const busyCount = employees.filter(e => e.status === 'Busy').length;
  const offlineCount = employees.filter(e => e.status === 'Offline').length;

  const data = [
    { name: 'Online', value: onlineCount, color: '#4ade80' }, // Green
    { name: 'Busy', value: busyCount, color: '#f87171' },     // Red
    { name: 'Offline', value: offlineCount, color: '#94a3b8' }, // Grey
  ];

  return (
    <div className="glass" style={{ 
      marginBottom: '30px', 
      padding: '20px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      minHeight: '300px'
    }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#e2e8f0' }}>📊 Team Availability</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60} // Makes it a "Donut" chart (Modern look)
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.1)" />
            ))}
          </Pie>
          
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '10px', border: 'none', color: 'white' }}
            itemStyle={{ color: 'white' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatsChart;

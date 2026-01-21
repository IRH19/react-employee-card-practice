import React from 'react';

function CommandBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, total, count }) {
  return (
    <div className="glass" style={{ 
      marginBottom: '30px', 
      padding: '20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px'
    }}>
      
      {/* LEFT: Search Inputs */}
      <div style={{ display: 'flex', gap: '15px', flex: 1, minWidth: '300px' }}>
        
        {/* Search Icon & Input Wrapper */}
        <div style={{ position: 'relative', flex: 1 }}>
          <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '45px' }} 
          />
        </div>

        {/* Status Dropdown */}
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ width: '150px', cursor: 'pointer' }}
        >
          <option value="All">All Statuses</option>
          <option value="Online">🟢 Online</option>
          <option value="Busy">🔴 Busy</option>
          <option value="Offline">⚫ Offline</option>
        </select>
      </div>

      {/* RIGHT: Live Counter */}
      <div style={{ 
        color: '#ccc', 
        fontSize: '0.9rem', 
        borderLeft: '1px solid rgba(255,255,255,0.2)', 
        paddingLeft: '20px' 
      }}>
        Showing <strong style={{ color: '#a855f7' }}>{count}</strong> / {total} Team Members
      </div>

    </div>
  );
}

export default CommandBar;

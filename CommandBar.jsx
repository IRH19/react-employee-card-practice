import React from 'react';

function CommandBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, total, count, employees }) {

  // 1. ADVANCED FEATURE: Generate CSV Blob
  const handleExport = () => {
    // A. Create the Header Row
    const headers = ["ID, Name, Role, Status"];
    
    // B. Map the data rows
    const rows = employees.map(emp => 
      `${emp.id}, "${emp.name}", "${emp.role}", ${emp.status}`
    );

    // C. Combine them with newlines
    const csvContent = [headers, ...rows].join("\n");

    // D. Create a virtual file link and click it
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Team_Report_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
      
      {/* LEFT: Search & Filter */}
      <div style={{ display: 'flex', gap: '15px', flex: 1, minWidth: '300px' }}>
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

      {/* RIGHT: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* NEW EXPORT BUTTON */}
        <button 
          onClick={handleExport}
          className="btn-glass"
          style={{ 
            background: 'rgba(16, 185, 129, 0.2)', // Green tint
            borderColor: '#10b981', 
            color: '#6ee7b7'
          }}
        >
          📥 Export CSV
        </button>

        <div style={{ 
          color: '#ccc', 
          fontSize: '0.9rem', 
          borderLeft: '1px solid rgba(255,255,255,0.2)', 
          paddingLeft: '20px' 
        }}>
          Showing <strong style={{ color: '#a855f7' }}>{count}</strong> / {total}
        </div>
      </div>

    </div>
  );
}

export default CommandBar;

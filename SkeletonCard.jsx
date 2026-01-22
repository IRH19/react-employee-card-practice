import React from 'react';

function SkeletonCard() {
  return (
    <div className="glass" style={{ 
      padding: '25px', 
      width: '220px', 
      height: '300px', /* Fixed height to match real card */
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      
      {/* Fake Avatar Circle */}
      <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%' }}></div>

      {/* Fake Name Line */}
      <div className="skeleton" style={{ width: '120px', height: '20px', marginTop: '15px' }}></div>
      
      {/* Fake Role Line */}
      <div className="skeleton" style={{ width: '80px', height: '15px', marginTop: '10px' }}></div>
      
      {/* Fake Status Dot */}
      <div className="skeleton" style={{ width: '100px', height: '20px', marginTop: '20px' }}></div>

      {/* Fake Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <div className="skeleton" style={{ width: '40px', height: '20px' }}></div>
        <div className="skeleton" style={{ width: '40px', height: '20px' }}></div>
        <div className="skeleton" style={{ width: '40px', height: '20px' }}></div>
      </div>

    </div>
  );
}

export default SkeletonCard;

import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Card; 
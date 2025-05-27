// src/app/buttons.js
'use client';

export const PrimaryButton = ({ children, onClick = () => {}, style = {} }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '1rem 2rem',
        fontSize: '1.25rem',
        backgroundColor: '#ffffffcc',
        color: '#000',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ...style,
      }}
      className="hover:scale-105 hover:shadow-lg active:scale-95"
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ children, onClick = () => {}, style = {} }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '1rem 2rem',
        fontSize: '1.25rem',
        backgroundColor: '#000000cc',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: 'translateY(0)',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        ...style,
      }}
      className="hover:scale-105 hover:shadow-lg active:scale-95 hover:bg-opacity-90"
    >
      {children}
    </button>
  );
};
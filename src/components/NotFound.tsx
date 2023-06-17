import React, { CSSProperties } from 'react';

export const NotFound: React.FC = () => {
  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  };

  const titleStyle: CSSProperties = {
    fontSize: '5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  };

  const messageStyle: CSSProperties = {
    fontSize: '2rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={messageStyle}>Page not found</p>
    </div>
  );
};


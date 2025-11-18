import React from 'react';

const buttonStyle = {
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '20px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
};

const Button = ({ children, onClick, type = 'button' }) => {
    return (
        <button type={type} onClick={onClick} style={buttonStyle}>
            {children}
        </button>
    );
};

export default Button;
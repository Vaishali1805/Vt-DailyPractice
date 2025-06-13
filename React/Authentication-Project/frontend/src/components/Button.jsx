import React from 'react'

const Button = ({className,value,onClick,disabled}) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>{value}</button>
  );
}

export default Button
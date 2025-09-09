import React from 'react'

function square({value,onSquareClick}) {
  return (
    <button className={`square ${value ? "" : "p-3"}`} onClick={onSquareClick}>{value}</button>
  );
}

export default square

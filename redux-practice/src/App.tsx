import { useState } from 'react'
import './App.css'
import { useAppSelector } from './redux/hooks'

function App() {
  const count = useAppSelector();
  return (
    <>
      <h1>Counter</h1>
      <div className="card">
        <button>+</button>
        <p>Count is {count}</p>
        <button>-</button>
      </div>
    </>
  )
}

export default App

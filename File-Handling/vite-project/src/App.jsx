import React, { useState } from 'react'
import SingleUpload from './Components/singleUpload';
import MultiUploads from './Components/multiUploads';
import './App.css'

function App() {
  const [choice, setChoice] = useState('null');

  const SingleClick = () => {
    setChoice(true);
  }

  const MultiClick = () => {
    setChoice(false);
  }
  return (
    <>
      <h2>Choose your File upload option: </h2>
      <div className='btnDiv'>
        <button onClick={SingleClick} >Upload Single File</button>
        <button onClick={MultiClick} >Upload Multiple Files</button>
      </div>
      {choice ? <SingleUpload /> : <MultiUploads />}
    </>
  )
}

export default App

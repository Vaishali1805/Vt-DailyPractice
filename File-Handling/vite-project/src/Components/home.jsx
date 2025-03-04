import React, { useEffect } from 'react'
import { useStates } from '../context/stateContext'
import { useNavigate } from 'react-router-dom'
import './home.css'

function Home() {
    const Navigate = useNavigate();
    const { uploadType, setUploadType } = useStates();

    useEffect(() => {
        if(uploadType){
            if (uploadType == 'single')
                Navigate('/singleFileUpload');
            if (uploadType == 'multiple')
                Navigate('/multipleFileUploads')
        }
    }, [uploadType])

    return (
        <>
            <h2>Choose your File upload option: </h2>
            <div className='btnDiv'>
                <button onClick={() => {
                    // Navigate('/singleFileUpload');           //We can also Navigate it here and another method is using useEffect
                    setUploadType("single")
                }} >Upload Single File</button>
                <button onClick={() => setUploadType("multiple")} >Upload Multiple Files</button>
            </div>
        </>
    )
}

export default Home
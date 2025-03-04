import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useStates, StateProvider } from './context/stateContext'
import Home from './Components/home';
import SingleUpload from './Components/singleUpload';
import MultiUploads from './Components/multiUploads';
import './App.css'

function AppContent() {
  const { uploadType } = useStates();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/singleFileUpload",
      element: uploadType == 'single' ? <SingleUpload /> : <Home />
    },
    {
      path: "/multipleFileUploads",
      element: uploadType == 'multiple' ? <MultiUploads /> : <Home />
    }
  ])

  return <RouterProvider router={router} />;
}

function App() {
 
  return (
    <StateProvider>
      <AppContent />
    </StateProvider>
  );
}

export default App

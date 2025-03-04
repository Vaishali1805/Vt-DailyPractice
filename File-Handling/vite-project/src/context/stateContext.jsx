import React from 'react'
import { createContext, useContext, useState } from "react";

//create context
export const stateContext = createContext();

//context provider
export const StateProvider = ({children}) => {
    const [uploadType, setUploadType] = useState(null);
    // console.log("uploadType: ",uploadType)

    return (
        <stateContext.Provider value = {{uploadType,setUploadType}}>
            {children}
        </stateContext.Provider>
    )
};

//Custom hook for using context
export const useStates = () => {
    return useContext(stateContext);
}

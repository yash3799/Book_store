import React, { useContext } from "react";

const AppContext =React.createContext();

const AppProvider =({children})=>{
    return(
        <AppContext.Provider value={"th"}>
            {children}
        </AppContext.Provider>
    )
}
const useGlobalContext =()=>{
    return useContext(AppProvider)
}
export default ( AppContext , AppProvider , useGlobalContext );
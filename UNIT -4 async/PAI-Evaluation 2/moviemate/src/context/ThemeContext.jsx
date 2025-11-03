import React from "react";
import { createContext,useContext,useState} from "react";

const ThemeContext=createContext()

export function ThemeProvider({children}){
    const[theme,setTheme]=useState("light")

    const toggleTheme =()=>setTheme(t=>t==='light'? 'dark':'light')

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className={theme==='dark'?'dark':'light'}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}
export function useTheme(){
    return useContext(ThemeContext)
}
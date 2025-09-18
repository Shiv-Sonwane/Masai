import { createContext, useState, useContext } from "react";

const ThemeContext= createContext();

export function ThemeProvider({children}){
    const[theme,setTheme]=useState("light")

    const toggleTheme=()=>{
        setTheme((prev)=>(prev=="light"?"dark" : "light"));  
    }

    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className={theme==="light"?"light-theme":"dark-theme"}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    return useContext(ThemeContext)
}
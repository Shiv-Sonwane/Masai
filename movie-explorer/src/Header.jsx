import React, { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function Header(){
    const {theme,toggleTheme}=useContext(ThemeContext);

    return(
        <header style={{
            padding:"10px 20px",
            display: "flex",
            justifyContent:"space-between",
            alignItems:"center",
            borderBottom:"1px solid"
        }}>
            <h2>Movie Explorer</h2>
            <button onClick={toggleTheme}>Switch to {theme==='light'?'dark':'light'} mode </button>
        </header>
    )
}

export default Header
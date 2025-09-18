import {useTheme} from "../context/ThemeContext";
import { Link } from "react-router-dom";

function Header(){
    const {theme,toggleTheme}=useTheme()

    return(
        <header style={{
            padding: "10px 10px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            borderBottom:"1px solid gray"
        }}>
            <Link to="/" style={{textDecoration:"none", fontWeight:"bold"}}>
            Country Explorer
            </Link>

            <button onClick={toggleTheme}>
                {theme==="light"?"Dark mode":"Light mode"}
            </button>

        </header>
    )
}

export default Header;
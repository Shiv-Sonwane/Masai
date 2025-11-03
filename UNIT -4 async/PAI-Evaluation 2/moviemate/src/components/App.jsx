import React,{useState} from 'react'
import axios from 'axios'
import SearchBar from './SearchBar'
import MovieCard from './MovieCard'
import { useTheme } from '../context/ThemeContext'

function App(){
    const [query,setQuery]=useState('')
    const [movie,setMovie]=useState(null)
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState(null)

    const { theme, toggleTheme } = useTheme();

    const apiKey='2d83bf7c'
    const searchMovie= async()=>{
        const title=query.trim()

        if(!title) return 
        setLoading(true)
        setError(null);
        
        try{
            const url = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`
            const res=await axios.get(url)
            if (res.data.Response === "True") {
               setMovie(res.data);
               setError(null);
            } else {
                setError(res.data.Error || "Movie not found");
                setMovie(null);
            }
        }
        catch(error){ 
            setError(error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return(
        <div className="app-container">
            <div className='header'></div>
            <h1>MovieMate Explorer</h1>
            <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <button onClick={toggleTheme}
                className='btn'
                style={{background: theme==='dark'?'#444444':'#E0E0E0'}}>
                    Toggle {theme==='dark'? 'Light':'Dark'}
                </button>
            </div>

            <SearchBar value={query} onChange={setQuery} onSearch={searchMovie} loading={loading}/>

            <main style={{marginTop:16}}>
                {loading && <div>Loading...</div>}
                {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
                {movie && <MovieCard movie={movie}/>}
            </main>

        </div>
    )
}

export default App;
import React from "react";
import { useEffect,useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

function HomePage(){
    const[movies,setMovies]=useState([])
    const[loading,setLoading]=useState(true)
    const [error,setError]=useState(null)

    useEffect(()=>{
        async function fetchMovies() {
            try{
                const res=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=efbfba08df0b82fbeeebbc41fcf69b3f')
                console.log(res.data)
                setMovies(res.data.results)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchMovies()
    },[])

    if(loading) return <p>Loading movies...</p>

    return(
        <div>
            {movies.map((movies)=>(
                <MovieCard key={movies.id} movie={movie} />
            ))}
        </div>
    )
}

export default HomePage;

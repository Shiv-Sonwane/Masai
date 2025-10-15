import React from "react";
import {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function MovieDetailPage(){
    const{id}=useParams();
    const [movie,setMovie]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        async function fetchMovie() {
            try{
                const res=await axios.get('https://api.themoviedb.org/3/movie/MOVIE_ID?api_key=efbfba08df0b82fbeeebbc41fcf69b3f')
                console.log(res.data)
                setMovie(res.data)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchMovie()
    },[id])

    if(loading) return <p>Loading movie details...</p>
    if(!movie) return <p>Movie Not Found</p>

    return(
        <div>
            <h3>{movie.title}</h3>
            <img src="" alt="" />
            <p>{movie.overview}</p>
            <p>Genres:{movie.map((g)=>g.name).join(", ")}</p>
            <p>Release:{movie.release_date}</p>
            <p>Runtime:{movie.runtime} mins</p>
            <p>Rating:{movie.vote_average}</p>
        </div>
    )
}

export default MovieDetailPage
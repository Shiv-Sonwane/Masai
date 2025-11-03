import React from "react";

function MovieCardInner({movie}){
    if(!movie) return null

    return (
        <div className="movie-card">
            <img className="movie-poster"
            src={movie.poster}
            alt={movie.title} />
            <div className="movie-info">
                <h2>{movie.title} <small>{movie.Year}</small></h2>
                <p><strong>Genre:</strong>{movie.genre}</p>
                <p><strong>Rating:</strong>{movie.rating}</p>
    

            </div>

        </div>
    )
}
/* React.memo */

export default React.memo(MovieCardInner)
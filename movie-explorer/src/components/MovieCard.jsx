import react from 'react'
import { useNavigate } from 'react-router-dom'

function MovieCard({movie}){
    const navigate = useNavigate()

    return (
        <div className='movie-card' onClick={()=>navigate(`/movie/${movie.id}`)}
          style={{
            cusrsor:'pointer',
            border: '1px solid',
            borderRadius:'8px',
            padding:'10px',
            width:'200px',
            textAlign:'center'
          }}>
            <img src="" alt="" />
            <h3>{movie.title}</h3>
            <p>Release:{movie.release_date}</p>
            <p>Rating:{movie.vote_average}</p>

        </div>
    )
}

export default MovieCard
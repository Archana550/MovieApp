import React from 'react';
import './MovieCard.css';

const MovieCard = (props) => {
  const { movie, handleFavouritesClick,isShowingFav,favourites } = props;
  const getButtonText = (movie) => {
    if (isShowingFav) {
        // If in the favorites view, show 'Remove'
        return 'Remove';
    } else {
        // If in the regular movies view
        const isFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);
        return isFavourite ? 'Added to Favorites' : 'Add to Favorites';
    }
};
  return (
    movie && <div aria-labelledby="${movie.title}" className="card mb-4" style={{ width: '80%' }}>
      <img 
        aria-hidden="true"
        src={movie.Poster} 
        className="card-img-top movie-poster" 
        alt={movie.Title} 
      />
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">Release Date: {movie.Year}</p>
        <button 
          aria-controls="Add to favourites"
          className="btn btn-warning" 
          onClick={()=>handleFavouritesClick(movie)}
          
        >

        {getButtonText(movie)}
        </button>

       
      </div>
    </div>
  );
};

export default MovieCard;

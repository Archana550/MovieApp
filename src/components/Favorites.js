import React, { useState } from 'react';

export default function Favorites(props) {
  const [showFav, setShowFav] = useState(false);

  // Toggle the showFav state
  const toggleFavorites = () => {
    setShowFav((prevShowFav) => !prevShowFav);
  };

  return (
    <div>
      <button onClick={toggleFavorites}>
        {showFav ? 'Close' : 'Favorites'}
      </button>
      {showFav && (
        <div aria-live="polite">
          {props.movies.length === 0 ? (
            <p>No more movies to show.</p>
          ) : (
            <ul>
              {props.movies.map((movie) => (
                <li key={movie.imdbID}>
                  {movie.Title} ({movie.Year})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

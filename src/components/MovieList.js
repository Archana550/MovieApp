import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieCard from './MovieCard';


const MovieList = ({ movies, handleFavouritesClick, isShowingFav,favourites}) => {
	

	return (
		<>

		<div className="container mt-4">
		<InfiniteScroll

		  dataLength={movies.length}
		  
		  loader={<h4>Loading...</h4>}
		  endMessage={<p className="text-center">No more movies to show</p>}
		>
		  <div className="row" aria-labelledby="List of all movies based on your search">
			{movies.map((movie) => (
			  <div className="col-md-4 " key={movie.id}>
			  <MovieCard 
			  movie={movie} 
			  handleFavouritesClick={handleFavouritesClick} 
			 
			 isShowingFav={isShowingFav}
			 favourites={favourites}
		  />
				
			  </div>
			  
			))}
		  </div>
		</InfiniteScroll>
	  </div>


		
		</>
	);
};

export default MovieList;

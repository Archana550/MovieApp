import React, { useState, useEffect } from 'react';

import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [isShowingFav, setIsShowingFav] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const query = searchValue || 'movie'; // Default query if no searchValue
		const url = `http://www.omdbapi.com/?s=${query}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
			console.log(movies);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	
	const addFavouriteMovie = (movie) => {
        // Check if the movie is already in the favourites list
        const isAlreadyFavourite = favourites.some(fav => fav.imdbID === movie.imdbID);

        if (!isAlreadyFavourite) {
            // Add the movie if it is not already in the favourites
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
        }
    };

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const toggleShowFav = () => {
		setIsShowingFav(!isShowingFav);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<button className="btn btn-danger btn-sm" onClick={toggleShowFav}>
				{isShowingFav ? 'Close' : 'Favorites'}
			</button>
			{isShowingFav && (
				<div className='row'>
					<MovieList
						movies={favourites}
						handleFavouritesClick={removeFavouriteMovie}
						isShowingFav={isShowingFav}
						favourites={favourites}
					/>
				</div>
			)}
			<div className='row'>
			{!isShowingFav &&(	<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					
					isShowingFav={isShowingFav}
					favourites={favourites}
				/>)}
			</div>
			
		</div>
	);
};

export default App;

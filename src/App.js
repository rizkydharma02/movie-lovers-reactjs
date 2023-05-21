import { useEffect, useState } from 'react';
import './App.css';
import { getMovieList, searchMovie } from './api';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([])

   const search = async(q) => {
    if(q.length > 3) {
    const query = await searchMovie(q)
    setPopularMovies(query.results)
   }
  }

useEffect(() => {
  getMovieList().then((results) => {setPopularMovies(results)})
}, [])

const PopularMovieList = () => {
  return popularMovies.map((movie, i) => {
    return (
    <div className='movie-wrapper' key={i}>
      <div className='movie-title'>{movie.title}</div>
      <img className='movie-image' src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
      <div className="movie-date">Release : {movie.release_date}</div>
      <div className="movie-rate">Rating : {movie.vote_average}</div>
    </div>
    )
  })
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Fans Lovers</h1>
        <input type="text" placeholder='cari film anda...' className='movie-search' onChange={({target}) => search(target.value)}/>
        <div className='movie-container'>
          <PopularMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;

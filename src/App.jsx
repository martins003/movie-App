import React from 'react'
import {useState, useEffect} from 'react';
import Search from './components/search';
import Spinner from './components/spinner';
import MovieCard from './components/movieCard';
import { useDebounce } from 'react-use';
import { getTrendingMovies, updateSearchCount } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;


const API_OPTIONS = {
  method:'GET',
  headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
 const [searchTerm, setSearchTerm] = useState('');

 const [errorMessage, setErrorMessage] = useState('');

 const [movieList, setMovieList] = useState([]);

 const [isLoading, setIsloading] = useState(false);

 const [trendingMovies, SetTrendingMovies] = useState('')
/*
const [debouncedSearchTerm, setdebouncedSearchTerm] = useState('');
debounces the search term to avoid making so many request by waiting for the user to stop typing for  500ms
useDebounce(() => setdebouncedSearchTerm(searchTerm), 500, [searchTerm])
*/ 

 const fetchMovies = async (query = '') => {
  setIsloading(true);
  setErrorMessage('');
    try{
      const endPoint =query
      ?`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}?sort_by=popularity.desc`;

      const response = await fetch(endPoint, API_OPTIONS);

      
      
      if(!response.ok){
        throw new Error(`Failed to fetch movies`)
      }

      const data = await response.json();
      
    if(data.response === 'false'){
      setErrorMessage(data.Error || 'failes to fetch movies');
      setMovieList([]);
      return;
    }
      setMovieList(data.results || [])

      if(query && data.results.length> 0){
        await updateSearchCount(query, data.results[0])
        
      }
      
    }
    catch(error){
      console.error(`Error fetching movies:${error}`);
      setErrorMessage('Error fetching movies. please try again later.')
    } finally{
      setIsloading(false)
    }
 }

 const LoadTrendingMovies = async () =>{
  try {
    const movies = await getTrendingMovies();
   
    SetTrendingMovies(movies)
  } catch (error) {
    console.error(`Error fetching trending movies${error}`);
    
  }
 }
   // ✅ Debounce the API call
  useDebounce(() => {
    fetchMovies(searchTerm);
  }, 1000, [searchTerm]);
 
 useEffect(() =>{
  LoadTrendingMovies();
},[])


  return (
    <main>
      <div className="pattern" />
     
     <div className="wrapper">
        <header>
            <img src="./hero-img.png" alt="hero bannar" />
          <h1>Find <span className='text-gradient'>Movies</span> you'll enjoy without Hassle</h1>

               
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />
        </header>
        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) =>(
                <li key={movie.$id}>
                  <p>{index +1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
            </ul>
          
          </section>
        )}
       <section className='all-movies'>
        <h2 >All Movies</h2>

          {isLoading ?(
          <Spinner />
          ): errorMessage ?(
          <p className='text-red-500'>{errorMessage}</p>
          ): (
            <ul>
              {movieList.map((movie) =>(
              <MovieCard key= {movie.id}  movie={movie}/>
              ) )}
            </ul>
          )}
      
       </section>
      </div>
    </main>
  )
}

export default App

import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard'

 // key =  a04e7b9f
 // API = http://www.omdbapi.com/?i=tt3896198&apikey=a04e7b9f

const API_URL = 'http://www.omdbapi.com/?apikey=a04e7b9f'

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('') 

    const searchMovies = async(title) => {
        const response = await fetch(` ${API_URL}&s=${title}`)
        const data = await response.json()
        setMovies(data.Search)
    }

    useEffect( (title) => {
        searchMovies('')
    }, [])

    return (
        <>
            <div className="app">
                <h1>MovieLand</h1>
                <div className="search">

                    <input placeholder="Enter keyword..."
                        value={searchTerm}
                        onChange={ (e)=> setSearchTerm(e.target.value) }
                    />

                   <img src ={SearchIcon} 
                        className="text-white" 
                        title="Search" 
                        alt="Search"
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>
                <div className="container">
                    {
                        movies?.length > 0
                        ? (
                            <>
                                { 
                                    movies.map( (movie) =>(
                                        <MovieCard props={movie}/>
                                    )) 
                                }
                            </>
                        ):
                        (
                            <>
                                <div className="empty">
                                    <h2> No Movies found</h2>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default App
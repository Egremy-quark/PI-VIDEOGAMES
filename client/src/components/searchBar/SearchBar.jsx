import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getGameByName } from '../../redux/actions'
import { Link } from "react-router-dom";

import Classes from '../searchBar/SearchBar.module.css'



const SearchBar = ({ handlePage }) => {

    const dispatch = useDispatch();
    const [title, setTitle] = useState("");

    const handleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getGameByName(title))
        handlePage(1)
    }

    const handleClickReset = (e) => {
        // e.preventDefault()
        // dispatch(getVideogames())
        // handlePage(1)
        window.location.reload();

    }



    return (
        <div className={Classes.navar}>

            <nav>
                <form className={Classes.form} >

                    <button type='reset' onClick={(e) => handleClickReset(e)}>
                        <img src={require('../UI/recargar.svg').default} alt='search' />
                    </button>

                    <input type='text' placeholder='Search game by name' onChange={(e) => handleChange(e)}>
                    </input>

                    <button type='submit' onClick={(e) => handleClick(e)} >
                        <img src={require('../UI/search.svg').default} alt='search' />
                    </button>


                </form>
            </nav>
            <div className={Classes.addGame}>
                <Link to='/videogame'>ADD VIDEOGAME</Link>
            </div>
            <div className={Classes.addGame}>
                <Link to='/about'>ABOUT ME</Link>
            </div>
        </div>
    )
}

export default SearchBar
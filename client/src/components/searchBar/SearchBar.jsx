import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getGameByName } from '../../redux/actions'
import { Link } from "react-router-dom";

import Classes from '../searchBar/SearchBar.module.css'



const SearchBar = ({ handlePage, setText, text, setVgNames, setSuggestions, vgNames, suggestions }) => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    const handleChange = (e) => {
        e.preventDefault()
        let matches = []
        // console.log(vgNames)
        if (e.target.value.length > 0) {
            matches = vgNames.filter(game => {
                const regex = new RegExp(`${e.target.value}`, "gi")
                return game.match(regex)
                // return game.match(regex)
            })
        }
        // console.log(vgNames)
        console.log('matches: ', matches)
        setSuggestions(matches)
        // setTitle(e.target.value)
        setText(e.target.value)
    }

    const onSuggestHandler = (text) => {
        setText(text)
        setSuggestions([])
        setTitle(text)
        dispatch(getGameByName(text))
    }

    // const handleChange = (e) => {
    //     setTitle(e.target.value)
    // }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(title)
        dispatch(getGameByName(text))
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
                <form
                    onSubmit={(e) => handleClick(e)}
                    className={Classes.form} >

                    <button type='reset' onClick={(e) => handleClickReset(e)}>
                        <img src={require('../UI/recargar.svg').default} alt='search' />
                    </button>

                    <input
                        type='text'
                        value={text}
                        placeholder='Search game by name'
                        onChange={(e) => handleChange(e)}

                    >

                    </input>

                    <button
                        type='submit'
                        onClick={(e) => handleClick(e)}
                    >
                        <img src={require('../UI/search.svg').default} alt='search' />
                    </button>


                </form>
                <div className={Classes.suggestions}>
                    {suggestions && suggestions.map((sug, i) => {
                        return (<div
                            className={Classes.sugItem}
                            key={i}
                            onClick={(e) => onSuggestHandler(sug)}
                        ><p>{sug}</p></div>)
                    })}
                </div>

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
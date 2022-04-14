import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getNames, getVideogames } from "../redux/actions/index";
import axios from 'axios'
import Classes from './UI/Home.module.css'

import Loader from '../components/UI/loader.gif'
import notFound from '../components/UI/notFound.gif'

// import GamesPerPage from './paginado/GamesPerPage';
import Paginado from './paginado/Paginado';
import Filters from "./filters/Filters";
import SearchBar from "./searchBar/SearchBar";
import Videogame from '../components/videogame/Card'

const Home = () => {
    const dispatch = useDispatch()

    const videoGameNames = useSelector(state => state.names)


    const gamesCopy = useSelector(state => state.copyVideogames)

    let API_KEY = '77691e54dc954903addf806673132eeb'

    //======================Experimento===============
    const [vgNames, setVgNames] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])



    //======================Experimento===============


    const [currentPage, setCurrentPage] = useState(1)
    const [/*order */, setOrder] = useState("")
    const [loader, setLoader] = useState(true);

    const [vGPerPage, /* setGamesPerPage*/] = useState(16)


    const lastGameIndex = currentPage * vGPerPage;
    //   1 * 16 = 16
    //   2 * 16 = 32

    const firstGameIndex = lastGameIndex - vGPerPage;
    // 16 - 16 = 0
    // 32 - 16 = 16

    const currentGame =
        gamesCopy.length > 0 && gamesCopy.slice(firstGameIndex, lastGameIndex)
    //100 > 0 | 100, 0 -- 16 = Si la primera parte es true la siguiente se ejecutará

    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
        dispatch(getNames())
        // setSuggestions(sug)

        // console.log(suggestions)
    }, [dispatch])

    useEffect(() => {
        const loadSuggestions = async () => {
            let Page1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=200`);
            let onlyNames = Page1.data.results.map(e => e.name)
            setVgNames(onlyNames)
        }
        loadSuggestions()
    }, [])


    const onChangeHandlerSearch = (text) => {
        setText(text)

    }
    const handlePage = (e) => {
        setCurrentPage(e)
    }


    const handleOrder = (e) => {
        setOrder(e)
    }



    if (currentGame && loader) {
        setLoader(false);
    }



    return (
        <div className={Classes.gridHome}>

            <div className={Classes.Search_bar}>

                <div className={Classes.Item_2}>
                    <SearchBar
                        handlePage={handlePage}
                        onChangeHandlerSearch={onChangeHandlerSearch}
                        setText={setText}
                        text={text}
                        vgNames={vgNames}
                        setVgNames={setVgNames}
                        setSuggestions={setSuggestions}
                        suggestions={suggestions}
                    />
                </div>
            </div>


            <div>
                <Filters
                    handleOrder={handleOrder}
                    handlePage={handlePage}
                />
            </div>

            <div>
                <Paginado
                    gamesCopy={gamesCopy.length}
                    handlePage={handlePage}
                    currentPage={currentPage}
                    vGPerPage={vGPerPage}
                />
            </div>

            <div>
                <section className='all_games' >
                    {currentGame.length > 0 && !loader ? (
                        currentGame.map(e => {
                            return (
                                <Videogame
                                    name={e.name}
                                    image={e.image}
                                    rating={e.rating}
                                    genres={e.genres}
                                    platforms={e.platforms}
                                    key={e.id}
                                    id={e.id}
                                    createdVideoGame={e.createdVideoGame}
                                />
                            );
                        })
                    ) : !currentGame && loader ? (
                        <div className="loader">
                            <img alt='loader' src={Loader} />
                        </div>


                    ) : (
                        <div className="loader">
                            <h1>Videogame not found, try with other title</h1>
                            <img alt='Not Found' src={notFound} />
                        </div>
                    )
                    }

                </section>
            </div>

        </div>
    )
}

export default Home
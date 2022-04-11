import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, getVideogames } from "../redux/actions/index";

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
    // const [, /* refreshState */, setRefreshState] = useState(false)

    const gamesCopy = useSelector(state => state.copyVideogames)
    // const genres = useSelector(state => state.genres)

    const [currentPage, setCurrentPage] = useState(1)
    const [/*order */, setOrder] = useState("")
    const [loader, setLoader] = useState(true);

    const [vGPerPage, /* setGamesPerPage*/] = useState(16)


    const lastGameIndex = currentPage * vGPerPage;
    const firstGameIndex = lastGameIndex - vGPerPage;


    const currentGame =
        gamesCopy.length > 0 && gamesCopy.slice(firstGameIndex, lastGameIndex)


    useEffect(() => {
        dispatch(getVideogames())
        dispatch(getGenres())
    }, [dispatch])


    const handlePage = (e) => {
        setCurrentPage(e)
    }


    const handleOrder = (e) => {
        setOrder(e)
    }


    // const handleReload = () => {
    //     window.location.reload();
    // };

    if (currentGame && loader) {
        setLoader(false);
    }



    return (
        <div className={Classes.gridHome}>

            <div className={Classes.Search_bar}>
                {/* 
                <div className={Classes.Item_1}>
                    <button onClick={handleReload}>
                        <img src={require(`./UI/reload.svg`).default} alt="Reload" />
                    </button>
                </div> */}


                <div className={Classes.Item_2}>
                    <SearchBar
                        handlePage={handlePage}
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
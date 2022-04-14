import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import {
    postGame,
    getGenres,
    getDetails,
    updateGame
} from '../../redux/actions/index'
import Classes from "./Create.module.css"
import Preview from './Preview'



const CreateGame = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [validador, setvalidador] = useState("");


    let plataformas = [
        'PlayStation 3',
        'PlayStation 4',
        'PlayStation 5',
        'PC',
        'Xbox 360',
        'Xbox One',
        'Xbox Series S/X',
        'macOS',
        'iOS',
        'Android',
        'Linux',
        'Nintendo Switch'
    ]



    const allGenres = useSelector((state) => state.genres);
    //Update Game
    const vGameToUpdate = useSelector(state => state.detail);
    const { id } = useParams();
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        dispatch(getGenres())
        id && dispatch(getDetails(id));
    }, [dispatch, id])

    let [videogame, setVideogame] = useState({

        name: "",
        description: "",
        released: "",
        rating: "",
        image: "",
        platforms: [],
        genres: []

    })


    function HandleSubmit(e) {
        e.preventDefault();
        if (videogame.name.trim() === "" || videogame.name.length < 2) {
            setvalidador("You need a name for your Videogame");
        } else if (videogame.description.trim() === "") {
            setvalidador("You need a description for your Videogame");
        } else if (videogame.released.trim() === "") {
            setvalidador("You need a released date for your Videogame");
        } else if (videogame.rating < 0 || videogame.rating > 6) {
            setvalidador("You need a rating for your Videogame");
        } else if (videogame.platforms.length === 0) {
            setvalidador("You have to choose a platform");
        } else if (videogame.genres.length === 0) {
            setvalidador("You need to classify your videogame");
        } else {
            if (videogame.name) {
                if (!id) {
                    console.log('Se creó un juego')
                    dispatch(postGame(videogame));
                    alert("juego creado");
                    navigate('/home')
                } else {
                    console.log('Se editó un juego')
                    dispatch(updateGame(videogame, id));
                    alert("juego modificado");
                    navigate('/home')
                }
            }
            setvalidador("");
            setVideogame({
                name: "",
                description: "",
                released: "",
                rating: "",
                image: "",
                platforms: [],
                genres: [],
            });

            document.getElementById("form").reset();
        }
    }


    if (id && vGameToUpdate.name && !updated) {
        setVideogame({
            ...videogame,
            name: vGameToUpdate.name,
            description: vGameToUpdate.description,
            released: vGameToUpdate.released,
            rating: vGameToUpdate.rating,
            plataforms: vGameToUpdate.platforms,
            image: vGameToUpdate.image,
            genres: vGameToUpdate.genres,
        });
        setUpdated(!updated);
    }





    //========================================================================
    let handleChange = (e) => {
        e.preventDefault();
        setVideogame({
            ...videogame,
            [e.target.name]: e.target.value
        });
    };
    //========================================================================

    function handleCheckPlataforms(e) {
        if (e.target.checked) {
            setVideogame({
                ...videogame,
                platforms: [...videogame.platforms, e.target.value],
            });
        } else if (!e.target.checked) {
            setVideogame({
                ...videogame,
                platforms: videogame.platforms.filter((p) => p !== e.target.value),
            });
        }
    }


    function handleCheckGenres(e) {
        if (e.target.checked) {
            setVideogame({
                ...videogame,
                genres: [...videogame.genres, e.target.value],
            });
        } else if (!e.target.checked) {
            setVideogame({
                ...videogame,
                genres: videogame.genres.filter((g) => g !== e.target.value),
            });
        }
    }


    return (
        <div className={Classes.layout}>


            <div className={Classes.create}>
                <div>
                    <Link to='/home' >
                        <img
                            alt='home'
                            src={require(`../videogame/icons/home.svg`).default}
                        />
                    </Link>
                </div>

                {id ? (
                    <h1>Actualiza tu juego</h1>
                ) : (
                    <h1>Crea tu Juego</h1>
                )}


                {validador && <div className={Classes.validador} >{validador}</div>}
                <form id="form" onSubmit={(e) => HandleSubmit(e)} >
                    <div className={Classes.img} >
                        <label>Load Image here: </label>
                        <input
                            type="url"
                            name="image"
                            value={videogame.image}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className={Classes.img}>
                        <label>Name: </label>
                        <input

                            type="text"
                            name="name"
                            value={videogame.name}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className={Classes.img}>
                        <label>Description:   </label>
                        <textarea
                            type="text"
                            value={videogame.description}
                            name="description"
                            maxLength="1000"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className={Classes.img} >
                        <label >Rating: </label>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={videogame.rating}
                            name="rating"
                            onChange={(e) => handleChange(e)} />
                    </div>


                    <div className={Classes.img}>
                        <label>Released: </label>
                        <input
                            type="date"
                            value={videogame.released}
                            name="released"
                            onChange={(e) => handleChange(e)} />
                    </div>



                    {/* ==================GENEROS==================== */}

                    <div className={Classes.containG}>
                        <h2>Generos: </h2>
                        <div className={Classes.generos}>
                            {
                                allGenres.map((g) => (
                                    <div key={g.id}>
                                        <input
                                            type="checkbox"
                                            onClick={(e) => handleCheckGenres(e)}
                                            value={g.name}
                                            name="genres"
                                            key={g.id}
                                        />{g.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    {/* =================PLATAFORMAS=============== */}

                    <div className={Classes.containG}>
                        <h2>Plataformas: </h2>
                        <div className={Classes.generos}>
                            {plataformas.map((e) => (
                                <div key={e}>
                                    <input
                                        type="checkbox"
                                        onClick={(e) => handleCheckPlataforms(e)}
                                        value={e}
                                        name="platforms"
                                        key={e}
                                    />{e}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={Classes.buttonH}>
                        <input value="Create videogame" type="submit" />

                    </div>

                </form>


            </div >
            <div className={Classes.preview}>
                <Preview
                    id={id}
                    name={videogame.name}
                    image={videogame.image}
                    rating={videogame.rating}
                    released={videogame.released}
                    description={videogame.description}
                    genres={videogame.genres}
                    platformas={plataformas}
                    plataforms={videogame.platforms}
                />
            </div>

        </div >

    )
}

export default CreateGame
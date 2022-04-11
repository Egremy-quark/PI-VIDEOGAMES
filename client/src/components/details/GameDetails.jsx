import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetails, deleteGame } from '../../redux/actions/index';
import Classes from "./GameDetails.module.css"
// import wait from '../components/UI/wait.gif'
import wait from '../UI/wait.gif'
// import released from '../UI/date.svg'

const GameDetails = () => {
    const dispatch = useDispatch();
    const gameId = useParams();
    let GameDetail = useSelector((state) => state.detail)

    const deleteG = () => {
        if (GameDetail.hasOwnProperty('createdVideoGame')) {
            dispatch(deleteGame(gameId.id))
        } else {
            alert('Este videojuego no puede ser eliminado')
        }
    }


    // console.log(gameId)
    useEffect(() => {
        dispatch(getDetails(gameId.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    // console.log(GameDetail)


    return (
        <div className={Classes.layout}>

            {
                (GameDetail.length === 0) ?
                    <div className={Classes.loader}>
                        <img alt='loader' src={wait} />
                        <h1>Wait</h1>
                    </div>
                    :
                    <div className={Classes.info}>
                        <div className={Classes.buttonH}>
                            <Link to='/home'>
                                <button >Home</button>
                            </Link>
                        </div>

                        <img
                            src={GameDetail.image}
                            alt="Img not found"
                        />

                        <div className={Classes.datos}>

                            <div className={Classes.released}>
                                <img src={require('../UI/date.svg').default} alt='date' />
                                <p>{GameDetail.released}</p>
                            </div>

                            <div className={Classes.rating}>
                                <p>{GameDetail.rating}</p>
                            </div>

                        </div>

                        <h1>{GameDetail.name}</h1>

                        <div className={Classes.description}>
                            <p>{GameDetail.description}</p>
                        </div>


                        <div className={Classes.PlatGenres}>
                            <div>
                                <h3>Platforms</h3>
                                <ul>
                                    {
                                        GameDetail.platforms.map(p => {
                                            return (
                                                <li key={p}>
                                                    {p}
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div>
                                <h3>Genres</h3>
                                <ul>
                                    {
                                        GameDetail.genres.map(g => {
                                            return (
                                                <li key={g}>
                                                    {g}
                                                </li>
                                            )
                                        })
                                    }


                                </ul>
                            </div>
                        </div>
                        <div className={Classes.buttonH}>
                            <Link to='/home'>
                                <button onClick={deleteG}>DELETE</button>
                            </Link>
                            <div>
                                {
                                    (GameDetail.createdVideoGame)
                                        ?
                                        <div className={Classes.Update}>
                                            <Link to={`/videogame/${gameId.id}`}>UPDATE</Link>
                                        </div>
                                        :
                                        <div className={Classes.Update}>
                                            <p>No se puede editar</p>
                                        </div>
                                }
                            </div>
                        </div>




                    </div>

            }
        </div >
    )
}
// export const gameId
export default GameDetails
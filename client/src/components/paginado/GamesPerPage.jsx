import Videogame from '../videogame/Card'

export default function GamesPerPage({ gamesCopy, currentPage }) {

    const lastGame = currentPage * 16
    const firstGame = lastGame - 16

    const pages = gamesCopy.slice(firstGame, lastGame)

    return (
        <>
            <div className='all_games'>
                {pages && pages.map((e, i) => {
                    return <Videogame
                        name={e.name}
                        image={e.image}
                        rating={e.rating}
                        genres={e.genres}
                        platforms={e.platforms}
                        key={e.id}
                        id={e.id}
                        createdVideoGame={e.createdVideoGame}
                    />
                })}
            </div>
        </>
    )
}
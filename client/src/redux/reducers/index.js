const initialState = {
    videogames: [],
    copyVideogames: [],
    genres: [],
    detail: [],
    names: []
}

function rootReducer(state = initialState, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                copyVideogames: action.payload
            };
        case 'GET_NAMES':
            return {
                ...state,
                names: action.payload
            }
        case 'DELETE_VIDEOGAME':
            return {
                ...state
            }
        case 'UPDATE_VIDEOGAME':
            return {
                ...state
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload
            };
        case 'GET_DETAILS':
            let arrGenre = action.payload;
            let arrDetail = []

            if (action.payload.hasOwnProperty('name')) {
                arrDetail = action.payload
            }

            if (action.payload[0] && action.payload[0].hasOwnProperty('createdVideoGame')) {
                arrDetail = arrGenre[0]
            }

            return {
                ...state,
                detail: arrDetail
            }
        case 'ORDER_BY_NAME':
            let orderList = state.copyVideogames.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
                return 0
            })
            if (action.payload === 'des') { orderList = orderList.reverse() }
            return {
                ...state,
                copyVideogames: orderList
            }
        case 'FILTER_BY_GENRE':
            const videogames = state.copyVideogames;
            const gamesPostFilter = action.payload === "all" ? videogames :
                // eslint-disable-next-line array-callback-return
                videogames.filter(r => {
                    // console.log(r)
                    let genre = r.genres.map(d => {
                        // console.log(d)
                        return d
                    })
                    if (genre.includes(action.payload))
                        return r
                })
            return {
                ...state,
                copyVideogames: gamesPostFilter
            }
        case 'ORDER_BY_RATING':
            let videogamesByRating = state.videogames.sort((a, b) => {
                if (a.rating > b.rating) return 1;
                if (b.rating > a.rating) return -1;
                return 0;
            })
            if (action.payload === 'asc') { videogamesByRating = videogamesByRating.reverse() }
            return {
                ...state,
                copyVideogames: videogamesByRating
            }
        case 'GET_VIDEOGAMES_NAME':
            return {
                ...state,
                copyVideogames: action.payload
            }
        case 'FILTER_POST':
            let gamesCopied = [];

            action.payload === 'All' ?
                gamesCopied = state.videogames  //Todas
                : action.payload === 'Created' ?
                    gamesCopied = state.videogames.filter((r) => r.createdVideoGame)   //Data Base
                    : action.payload === 'Api' ?
                        gamesCopied = state.videogames.filter((r) => !r.createdVideoGame) //API
                        : gamesCopied = state.recipes
            return {
                ...state,
                copyVideogames: gamesCopied
            }
        case 'FILTER_PLATFORM':
            const videogameByPlat = state.copyVideogames;
            let gameByPlatform = action.payload === "all" ? videogameByPlat :
                // eslint-disable-next-line array-callback-return
                videogameByPlat.filter(r => {

                    let platform = r.platforms.map(d => {
                        // console.log(d)
                        return d
                    })
                    if (platform.includes(action.payload))
                        return r //Verificar si lo que pasamos por el option est?? dentro de cada vgame
                })
            return {
                ...state,
                copyVideogames: gameByPlatform
            }

        default:
            return { ...state };

    }
}
export default rootReducer;
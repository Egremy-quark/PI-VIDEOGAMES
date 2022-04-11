import axios from 'axios';


export const getVideogames = () => {
    return async (dispatch) => {
        try {
            let json = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getGenres = () => {
    return async (dispatch) => {
        try {
            let json = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: 'GET_GENRES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

// ======================By-Name=============

export const getGameByName = (name) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`http://localhost:3001/videogames?name=${name}`)

            return dispatch({
                type: 'GET_VIDEOGAMES_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}


// ====================By-ID==================

export const getDetails = (id) => {
    return async (dispatch) => {
        try {
            let gameInfo = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: gameInfo.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


// ====================FILTERS=======================
export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const filterGenre = (payload) => {
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}


export const filterByRating = (payload) => {
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}


export const filterPost = (payload) => {
    return {
        type: 'FILTER_POST',
        payload
    }
}



// ====================CREATE-VIDEOGAME=======================

export const postGame = (payload) => {
    return async function (dispatch) {
        let videogamePost = await axios.post(`http://localhost:3001/videogame`, payload)
        return videogamePost
    }
}


// ====================DELETE-VIDEOGAME=======================

export const deleteGame = (id) => {
    return async function (dispatch) {
        try {
            await axios.delete(`http://localhost:3001/videogame/${id}`);
            return dispatch({
                type: 'DELETE_VIDEOGAME'
            });
        } catch (error) {
            console.log(error)
        }
    }
}


// ====================DELETE-VIDEOGAME=======================
export const updateGame = (gameUpdate, id) => {
    return async function (dispatch) {

        try {
            await axios.put(`http://localhost:3001/videogame/${id}`, gameUpdate)
            return dispatch({
                type: 'UPDATE_VIDEOGAME'
            });
        } catch (error) {
            console.log(error)
        }
    }
}
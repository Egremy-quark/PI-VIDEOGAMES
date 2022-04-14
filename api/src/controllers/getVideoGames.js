const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { Op } = require("sequelize");

function dbConcat(gamesApiResults = [], gamesDb = [], search) {

    if (gamesApiResults.data?.count === 0 && gamesDb.length === 0) {

        games = []
        return games

    }

    else {

        let gamesApi;

        // console.log(gamesDb)
        gamesApi = gamesApiResults.data?.results?.map(game => extractDataApi(game)) || []
        gamesApi.slice(1, 12)

        const games = [...gamesDb, ...gamesApi]


        if (search) {
            return games.slice(0, 15)
        } else {
            return games
        }
    }
}

function extractDataApi({ id, name, description, released, rating, background_image, platforms, genres }) {


    return {
        id: id,
        name: name,
        description: description || 'Without description',
        dateRelease: released,
        rating: rating,
        genres: genres?.map((g) => g.name),
        platforms: platforms.map((p) => p.platform.name),
        image: background_image || 'https://www.geekmi.news/__export/1619631525888/sites/debate/img/2021/04/28/luffy1.jpg_778525087.jpg',
    }

}


const getVideogames = async () => {
    try {
        const games = [];
        let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
        for (let i = 1; i < 6; i++) {
            let pages = await axios.get(url);
            pages.data?.results.forEach((e) => {
                games.push({
                    id: e.id,
                    name: e.name,
                    image: e.background_image,
                    rating: e.rating,
                    genres: e.genres.map((gender) => gender.name),
                    platforms: e.platforms.map((platform) => platform.platform.name),
                });
            });
            url = pages.data.next;
        }
        return games;
    } catch (error) {
        console.log(error);
    }
};



const getDbVideogames = async () => {
    let dbgamesdata = await Videogame.findAll({

        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    let newdatagame = dbgamesdata.map((e) => {
        return {
            id: e.id,
            name: e.name,
            rating: e.rating,
            image: e.image,
            platforms: e.platforms,
            genres: e.genres.map((e) => e.name),
            description: e.description,
            released: e.released,
            createdVideoGame: e.createdVideoGame,

        };
    });

    return newdatagame;

};

const getAllInfo = () => {

    try {
        let allInfo = Promise.all([getVideogames(), getDbVideogames()]).then(
            (resultado) => {
                return [...resultado[0], ...resultado[1]];
            }
        );

        return allInfo;
    } catch (error) {
        console.log(error);
    }
};



async function getGenres() {
    const genres = await Genre.findAll()
    return genres
}



async function searchForName(search) {

    let gamesApiResults = []
    let newdata = []
    let dbFiltrada = []
    try {
        console.log('Búsqueda por nombre', search)
        gamesApiResults = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${search}`)
    } catch (err) {
        console.log('api', err)
    }

    try {


        let gamesDb = await Videogame.findAll({

            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        });



        newdata = gamesDb.map((e) => {
            return {
                id: e.id,
                name: e.name,
                rating: e.rating,
                image: e.image,
                platforms: e.platforms,
                genres: e.genres.map((e) => e.name),
                description: e.description,
                released: e.released,
                createdVideoGame: e.createdVideoGame,

            };
        });

        dbFiltrada = newdata.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

        console.log(dbFiltrada)



    } catch (err) {
        console.log('db', err)
    }

    return dbConcat(gamesApiResults, dbFiltrada, true)
}




module.exports = {
    getVideogames,
    getDbVideogames,
    getAllInfo,
    getGenres,
    searchForName
};
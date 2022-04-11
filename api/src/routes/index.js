const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;
const { getVideogames, getDbVideogames, getAllInfo, searchForName, getGenres } = require('../controllers/getVideoGames');


const router = Router();

router.get("/videogames", async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name)
        if (name) {
            console.log('Por name: ', name)
            const games = await searchForName(name)
            res.json(games)
        } else {
            const allgames = await getAllInfo();
            res.status(200).send(allgames);
        }

    } catch (error) {
        console.log(error)
    }

});

router.get("/videogames/:id", async function (req, res) {

    try {
        const { id } = req.params;

        if (id.length > 7 && typeof id === "string") {
            let gameCreated = await getDbVideogames();
            let gameID = await gameCreated.filter((gi) => gi.id === id);

            return res.status(200).json(gameID);
        } else {

            const gameById = await axios.get(
                `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
            );

            const oneGame = {
                id: gameById.data.id,
                name: gameById.data.name,
                image: gameById.data.background_image,
                rating: gameById.data.rating,
                released: gameById.data.released,
                description: gameById.data.description.replace(/<[^>]*>?/g, ''),
                genres: gameById.data.genres.map((g) => g.name),
                platforms: gameById.data.parent_platforms.map((p) => p.platform.name),
            };
            return res.status(200).json(oneGame);
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/genres', async (req, res) => {
    try {
        console.log('Ya entró perro')
        const genres = await getGenres()
        res.json(genres)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post("/videogame", async function (req, res) {
    try {
        let { name, image, description, released, rating, genres, platforms } = req.body;

        if (!name || !platforms || !genres || !description) {
            res.status(404).send("Falta data");
        } else {
            let newGame = await Videogame?.create({

                name,
                image:
                    image ||
                    "https://images5.alphacoders.com/932/thumb-1920-932952.jpg",
                description:
                    description ||
                    'No hay descripción',
                released,
                rating,
                platforms

            });


            genres.forEach(async (e) => {
                let genresDb = await Genre.findAll({
                    where: { name: e }
                });
                await newGame.addGenres(genresDb);
            })

            res.status(200).json(newGame);
        }
    } catch (error) {
        console.log(error);
    }
});



router.put("/videogame/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const gameupid = await Videogame.findOne({
            where: {
                id: id,
            },
        });

        await gameupid.update({
            name: req.body.name,
            rating: req.body.rating,
            released: req.body.released,
            image: req.body.image,
            description: req.body.description,
            platforms: req.body.platforms,
        });

        req.body.genres.forEach(async (e) => {
            // recorro por los generos que me pasen y los busco en mi base de datos
            let genderDB = await Genre.findAll({ where: { name: e } });
            await gameupid.setGenres(genderDB);
        });

        res.send(gameupid);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/videogame/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const videogamedelete = await Videogame.findByPk(id);
        if (videogamedelete) {
            await videogamedelete.destroy();
            return res.send("video juego elimindado");
        }
        res.status(404).send("videogame no encontrado");
    } catch (error) {
        console.log(error);
    }
});



module.exports = router;
// import React, { useState } from 'react'
// import { updateGame } from '../../redux/actions'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Preview from './Preview'
// import Classes from "./Update.module.css"


// const UpdateGame = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const allGenres = useSelector(state => state.genres);
//     const oldGame = useSelector(state => state.detail);
//     const { id } = useParams()

//     let [videogame, setVideogame] = useState({

//         name: oldGame.name,
//         image: oldGame.image,
//         description: oldGame.description,
//         released: oldGame.released,
//         rating: oldGame.rating,
//         platforms: oldGame.platforms,
//         genres: oldGame.genres

//     })

//     const validaciones = () => {
//         if (videogame.name.length === 0) {
//             setVideogame({
//                 ...videogame,
//                 name: oldGame.name
//             })
//         }
//         if (videogame.rating.length === 0) {
//             setVideogame({
//                 ...videogame,
//                 rating: oldGame.rating
//             })
//         }
//         if (videogame.released.length === 0) {
//             setVideogame({
//                 ...videogame,
//                 released: oldGame.released
//             })
//         }
//         if (videogame.image.length === 0) {
//             setVideogame({
//                 ...videogame,
//                 image: oldGame.image
//             })
//         }
//         if (videogame.description.length === 0) {
//             setVideogame({
//                 ...videogame,
//                 description: oldGame.description
//             })
//         }

//         return true
//     }



//     let plataformas = [
//         'PlayStation 3',
//         'PlayStation 4',
//         'PlayStation 5',
//         'PC',
//         'Xbox 360',
//         'Xbox One',
//         'Xbox Series S/X',
//         'macOS',
//         'iOS',
//         'Android',
//         'Linux',
//         'Nintendo Switch'
//     ]

//     function handleCheckPlataforms(e) {
//         if (e.target.checked) {
//             setVideogame({
//                 ...videogame,
//                 [e.target.name]: [...videogame.platforms, e.target.value],
//             });
//         } else if (!e.target.checked) {
//             setVideogame({
//                 ...videogame,
//                 [e.target.name]: videogame.platforms.filter((plat) => plat !== e.target.value),
//             });
//         }
//     }


//     function handleCheckGenres(e) {
//         if (e.target.checked) {
//             setVideogame({
//                 ...videogame,
//                 [e.target.name]: [...videogame.genres, e.target.value],
//             });
//         } else if (!e.target.checked) {
//             setVideogame({
//                 ...videogame,
//                 [e.target.name]: videogame.genres.filter((g) => g !== e.target.value),
//             });
//         }
//     }


//     const previewObjc = (e) => {
//         e.preventDefault();
//         console.log(e.target.value)
//         setVideogame({
//             ...videogame,
//             [e.target.name]: e.target.value
//         })
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log(videogame)
//         if (validaciones()) {
//             dispatch(updateGame(videogame, id))
//             navigate('/home');
//         }

//     }



//     return (
//         <div className={Classes.container}>


//             <div className={Classes.Update}>

//                 <Link to='/home'>
//                     <button className='button-home'>
//                         <img
//                             alt='home'
//                             src={require(`../videogame/icons/home.svg`).default}
//                         />
//                     </button>
//                 </Link>

//                 <h1>Update Game</h1>

//                 <div className={Classes.form}>

//                     <form onSubmit={handleSubmit} >

//                         <label>Img</label>
//                         <input
//                             onChange={(e) => previewObjc(e)}
//                             type="url"
//                             name="image"
//                         />


//                         <label> Name
//                             <input
//                                 onChange={(e) => previewObjc(e)}
//                                 type='text'
//                                 name='name'
//                             />
//                         </label>
//                         <label> rating
//                             <input
//                                 onChange={(e) => previewObjc(e)}
//                                 type="range"
//                                 min="0"
//                                 max="5"
//                                 name='rating'
//                             />
//                         </label>
//                         <label>
//                             <input
//                                 onChange={(e) => previewObjc(e)}
//                                 type="date"
//                                 name='released'
//                             />
//                         </label>
//                         <label>Description
//                             <input
//                                 onChange={(e) => previewObjc(e)}
//                                 type="text"
//                                 name="description"
//                             />
//                         </label>

//                         <div className={Classes.containG} >
//                             <h2>Generos: </h2>
//                             <div className={Classes.generos}>
//                                 {
//                                     allGenres.map((g) => (
//                                         <div key={g.id}>
//                                             <input
//                                                 type="checkbox"
//                                                 onChange={(e) => handleCheckGenres(e)}
//                                                 value={g.name}
//                                                 name="genres"
//                                                 key={g.id}
//                                             />{g.name}
//                                         </div>
//                                     ))
//                                 }
//                             </div>
//                         </div>

//                         <div className={Classes.containG}>
//                             <h2>Plataformas: </h2>
//                             <div className={Classes.generos}>
//                                 {plataformas.map((e) => (
//                                     <div key={e}>
//                                         <input
//                                             type="checkbox"
//                                             onChange={(e) => handleCheckPlataforms(e)}
//                                             value={e}
//                                             name="platforms"
//                                             key={e}
//                                         />{e}
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                         <button type='submit' >ENVIAR</button>


//                     </form>

//                 </div>
//             </div>



//             {/* =====================STEPS========================= */}



//             <Preview
//                 name={videogame.name}
//                 image={videogame.image}
//                 rating={videogame.rating}
//                 released={videogame.released}
//                 description={videogame.description}
//             />
//         </div>
//     )
// }

// export default UpdateGame
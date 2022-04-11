import React from 'react';
import Classes from "./Card.module.css"
import { Link } from 'react-router-dom';

const Videogame = ({ name, image, rating, genres, platforms, id }) => {


    let duplicates = (a) => {
        let arr = a.join(' ').split(' ')
        return arr.filter((item, index) => arr.indexOf(item) === index)
    }

    let filterplatforms = duplicates(platforms)
    // console.log(platforms)

    let bool = false
    bool = genres.map((e) => {
        if (e.hasOwnProperty('name')) return true;
        return false
    })


    return (
        <div className={Classes.card}>

            <div className={Classes.box_img}>
                <img
                    src={image}
                    alt='Img not found' />
            </div>

            <div className={Classes.header}>
                <div className={Classes.platforms}>


                    {
                        // eslint-disable-next-line array-callback-return
                        filterplatforms.map((e) => {


                            if (e === 'Xbox') {
                                return (<div key={e}>
                                    <img
                                        alt='xbox'
                                        src={require(`./icons/xbox.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'PlayStation') {
                                return (<div key={e}>
                                    <img
                                        alt='playstation'
                                        src={require(`./icons/playstation.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'iOS') {
                                return (<div key={e}>
                                    <img
                                        alt='ios'
                                        src={require(`./icons/ios.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'macOS') {
                                return (<div key={e}>
                                    <img
                                        alt='macos'
                                        src={require(`./icons/macOs.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'Linux') {
                                return (<div key={e}>
                                    <img
                                        alt='linux'
                                        src={require(`./icons/linux.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'Android') {
                                return (<div key={e}>
                                    <img
                                        alt='android'
                                        src={require(`./icons/android.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'Windows') {
                                return (<div key={e}>
                                    <img
                                        alt='windows'
                                        src={require(`./icons/windows.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'PC') {
                                return (<div key={e}>
                                    <img
                                        alt='pc'
                                        src={require(`./icons/pc.svg`).default}
                                    />
                                </div>)
                            } else if (e === 'Nintendo') {
                                return (<div key={e}>
                                    <img
                                        alt='nintendo'
                                        src={require(`./icons/nintendo.svg`).default}
                                    />
                                </div>)
                            }
                        })
                    }

                </div>
                <div className={Classes.rating_container}>

                    <div className={Classes.rating}>
                        <p>{rating}</p>
                    </div>

                </div>
            </div>

            <div className={Classes}>
                <h3>{name}</h3>
            </div>


            <div className={Classes.info}>

                {
                    (bool[0])
                        ? genres.map((e) => {
                            return <p key={e.name}>
                                {e.name}
                            </p>
                        })
                        : genres.map((e) => {
                            return <p key={e}>
                                {e}
                            </p>
                        })

                }



            </div>
            <div className={Classes.more_info}>
                <Link to={`/videogames/${id}`}>info</Link>

            </div>





        </div >
    )
}

export default Videogame

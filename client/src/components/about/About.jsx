import React from 'react'
import { NavLink } from "react-router-dom";
import Classes from '../about/About.module.css'

import Github from '../UI/github.svg'
import linkedin from '../UI/linkedin.svg'
import luffy from '../UI/about.gif'

const About = () => {





    return (
        <div className={Classes.container}>
            <main className={Classes.main}>
                <NavLink to="/home">
                    <button>BACK TO HOME</button>
                </NavLink>
                <h1>About me</h1>
                <p>Hi! My name is Alfred and I am the creator of this SPA.</p>
                <p>
                    This Project was made while studying in Henry's bootcamp, as my
                    individual project.
                </p>
                <p>
                    It's made from bottom to top by me, meaning i developed both backend
                    and frontend.
                </p>
                <p>
                    If you are interested in my skills, you can get in touch with me, via
                    my social media below:
                </p>

                <div className={Classes.main__images}>
                    <a
                        rel="noreferrer"
                        href='https://github.com/Egremy-quark/PI-VIDEOGAMES'
                        target="_blank"
                    >
                        <img src={Github} alt="github" />
                    </a>

                    <a
                        rel="noreferrer"
                        href='https://www.linkedin.com/in/alfredo-egremy-elias-28a35a220/'
                        target="_blank"
                    >
                        <img src={linkedin} alt="linkedin" />
                    </a>
                </div>
            </main>

            <aside className={Classes.aside}>
                <img alt='saludo' src={luffy} />
            </aside>

        </div>
    )
}

export default About
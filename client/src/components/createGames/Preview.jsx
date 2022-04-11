import React from 'react'
import Classes from "./Create.module.css"

const Preview = ({ name, image, rating, released, description, id }) => {
    return (
        <div className={Classes.PreviewCard}>


            <h2>Preview</h2>
            <div className={Classes.ImageContainer}>
                {
                    (image === "")
                        ? <p>¡Aqui se mostrara su imagen!</p>
                        : <img src={image} alt='img' />
                }
            </div>

            <div className="info">
                <span>Name: </span><p>{name}</p>
                <span>Rating: </span><p>{rating}</p>
                <span>Released: </span><p>{released}</p>
                <span>Description: </span><p>{description}</p>
            </div>

        </div>
    )
}

export default Preview
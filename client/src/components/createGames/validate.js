
export function validate(videogame) {
    let errors = {};
    let regularExpression = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regExpUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

    if (!videogame.image) {
        errors.image = 'Your videogame need a img'
    } else if (!videogame.name.trim()) {
        errors.name = "Your videogame need a title!"
    } else if (!regularExpression.test(videogame.name.trim())) {
        errors.name = "Name field only accepts letters and blank spaces"
    } else if (!videogame.platforms) {
        errors.platforms = "Tell us where i can found this videogame"
    } else if (!regExpUrl.test(videogame.image.trim())) {  //búsqueda de una ocurrencia entre una expresión regular y una cadena especificada
        errors.image = "Must be a URL direction"
    }
    return errors;
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderByName, filterGenre, filterByRating, filterPost } from '../../redux/actions/index'
import Classes from '../filters/filter.module.css'
const Filters = ({ handleOrder, handlePage }) => {
    const dispatch = useDispatch()
    const selectGenre = useSelector(state => state.genres)

    const handleOrderName = (e) => {
        e.preventDefault()
        if (e.target.value === 'not') {
            e.target.value = "Alphabet order"
        } else {
            handleOrder(e.target.value)
            dispatch(orderByName(e.target.value))
        }
    }

    const handleGenres = (e) => {
        e.preventDefault()

        if (e.target.value === 'not') {
            e.target.value = "Genre filter"
        } else {
            dispatch(filterGenre(e.target.value))
            handlePage(1)
        }
    }

    const handleRating = (e) => {
        e.preventDefault()

        if (e.target.value === 'not') {
            e.target.value = "Rating"
        } else {
            handleOrder(e.target.value)
            dispatch(filterByRating(e.target.value))
            handlePage(1)
        }
    }

    const handleDbOrApi = (e) => {
        e.preventDefault()

        if (e.target.value === 'not') {
            e.target.value = "Db or Api"
        } else {
            handlePage(1)
            dispatch(filterPost(e.target.value))
        }
    }

    // const handleOrderPlatform = (e) => {
    //     e.preventDefault()

    // }

    return (
        <div className={Classes.filtros}>
            <select
                className={Classes.filter}
                onChange={(e) => handleOrderName(e)} >
                <option value='not'>Alphabet order</option>
                <option value='asc'>Ascendent</option>
                <option value='des'>Descendent</option>
            </select>

            <select
                className={Classes.filter}
                onChange={(e) => handleGenres(e)}>
                <option value='not'>Genre filter</option>
                <option value='all'>All</option>
                {selectGenre.map((e) => {
                    return (
                        <option key={e.name} value={e.name} >
                            {e.name}
                        </option>
                    )
                })}
            </select>

            <select
                className={Classes.filter}
                onChange={(e) => { handleRating(e) }} >
                <option value='not'>Rating</option>
                <option value='asc'>More</option>
                <option value='des'>Less</option>
            </select>

            <select
                className={Classes.filter}
                onChange={(e) => handleDbOrApi(e)}>
                <option value='not'>Db or Api</option>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Api'>Api</option>
            </select>



        </div >
    )
}

export default Filters
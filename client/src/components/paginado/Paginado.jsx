import React from 'react'
import Classes from './Paginado.module.css'

export default function Pagination({ gamesCopy, handlePage, currentPage, vGPerPage }) {
    let pages = []
    for (let i = 1; i <= Math.ceil(gamesCopy / vGPerPage); i++) {
        pages.push(i) // pages[1,2,3,4,5,6,7,8,9,10,11]
    }


    return (
        <div className={Classes.paginado} >
            <nav>
                <div className={Classes.lista} >
                    <ul>
                        <li>
                            <button

                                onClick={() => { handlePage(1) }}
                                className={(currentPage === 1)
                                    ? Classes.display
                                    : Classes.no}
                            >First
                            </button>
                        </li>
                        <li>
                            <button
                                // disabled={currentPage > 1
                                //     ? false
                                //     : true}
                                onClick={() => handlePage(currentPage - 1)}
                                className={(currentPage === 1)
                                    ? Classes.display
                                    : Classes.no}
                            >Prev
                            </button>
                        </li>

                        {pages.map((e, i) => (
                            <li key={e}>
                                <button onClick={() => { handlePage(e) }}>
                                    {e}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => handlePage(currentPage + 1)}
                                className={(currentPage === pages.length)
                                    ? Classes.display
                                    : Classes.no}
                            >Next
                                {/* <img className='flecha' src="./next.svg" alt="next" /> */}
                            </button>
                        </li>


                        <li>
                            <button
                                onClick={() => { handlePage(pages.length) }}
                                className={(currentPage === pages.length)
                                    ? Classes.display
                                    : Classes.no}
                            >
                                Last
                            </button>
                        </li>
                    </ul>

                </div>
            </nav>
        </div >
    )
}
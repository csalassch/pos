import React from 'react';
import { number } from 'yup';

const Pagination = ({ usersPerPage, totalUsers, paginate,pageChanged,setPageChanged }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);

    }
    
    return (
        
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => {
                            paginate(number);
                            setPageChanged(true);
                            console.log("pageChanged: ",pageChanged);
                        }} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))

                }
            </ul>
        </nav>
    )


}

export default Pagination;
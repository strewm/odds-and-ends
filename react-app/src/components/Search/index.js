import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllPostings } from '../../store/postings';
// import { searchSongs } from '../../store/songs';

import './Search.css'

function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();


    useEffect(async () => {
        let error;
        const results = [];

        const postings = await dispatch(getAllPostings())
        const postingsArr = Object.values(postings);

        for (let i = 0; i < postingsArr.length; i++) {
            let posting = postingsArr[i];

            let checkSearch = posting.city.toLowerCase().includes(search.toLowerCase());

            if (search && checkSearch) {
                results.push(posting);
            } else if ((i === postingsArr.length - 1) && search && !checkSearch) {
                console.log('whyyyyy inside here...', search, checkSearch)
                error = 'Nothing here! Try a different search...'
            }
        }

        setResults(results)
        setErrors(error)
    }, [search]);

    useEffect(() => {
        document.body.addEventListener('click', clearSearch);

        // Clean-up to remove event handler
        return () => { window.removeEventListener('click', clearSearch) };
    }, []);

    let clearSearch = (e) => {
        setSearch('');
    };


    return (
        <div className='search-container'>
            <input
                className='search-bar'
                placeholder='Search by city...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {/* <i id='button-close' className="fa-solid fa-xmark" onClick={clearSearch}></i> */}
            <div className='search-results'>
                {results && results.map(result => (
                    <NavLink className='search-result' to={`postings/${result.id}`} onClick={() => setResults('')} key={result.id}>
                        <div id='result-title'>{result.title}</div>
                        <div id='result-location'>{result.city}, {result.state}</div>
                    </NavLink>
                ))}
                <div className="search-result">
                    {errors ? `${errors}` : ''}
                </div>
            </div>
        </div>
    )
}

export default Search;

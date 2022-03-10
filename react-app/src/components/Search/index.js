import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllPostings } from '../../store/postings';
// import { searchSongs } from '../../store/songs';

import './Search.css'

function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();

    // useEffect(async () => {
    //     if (search.length <= 0) return;
    //     else history.push('/');

    // }, [search])

    useEffect(async () => {
        const results = [];
        const error = {};

        const postings = await dispatch(getAllPostings())
        const postingsArr = Object.values(postings);

        // console.log('POSTINNNNNNNNNNGS', postings);
        // console.log('we dispatched get all postings!', Object.values(postings))

        // if (search.length <= 0) return;


        for (let i = 0; i < postingsArr.length; i++) {
            let posting = postingsArr[i];

            if (search && posting.city.toLowerCase().includes(search.toLowerCase())) {
                results.push(posting);
                // console.log('reeeeesults',results)
            } else {
                // error = 'Nothing here! Try a different search.'
            }
        }

        setResults(results)
        // setErrors(error)
    }, [search]);

    useEffect(() => {
        document.body.addEventListener('click', clearSearch);

        // Clean-up to remove event handler
        return () => { window.removeEventListener('click', clearSearch)};
    }, []);

    let clearSearch = (e) => {
        setSearch('');
    }

    // When I click anywhere outside of search want to close the dropdown
    // If I scroll around it sticks

    return (
        <div className='search-container'>
            <input
                className='search-bar'
                placeholder='Search by city...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={clearSearch}>Click to exit</button>
            <ul className='search-results'>
                {results && results.map(result => (
                    <li className='search-result' key={result.id}>
                        <NavLink className='search-result-click' to={`postings/${result.id}`} onClick={() => setResults('')}>{result.title} + {result.address}, {result.city}, {result.state}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Search;

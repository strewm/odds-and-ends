import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { getAllPostings } from '../../store/postings';
// import { searchSongs } from '../../store/songs';

import './Search.css'

function Search() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    // const [errors, setErrors] = useState({});
    const [errors, setErrors] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();


    // const postings = useSelector(state => state.postings);

    useEffect(async () => {
        if (search.length <= 0) return;
        else history.push('/');

    }, [search])

    useEffect(async () => {
        const results = [];
        const error = {};

        const postings = await dispatch(getAllPostings())
        const postingsArr = Object.values(postings);

        // console.log('POSTINNNNNNNNNNGS', postings);
        // console.log('we dispatched get all postings!', Object.values(postings))

        for (let i = 0; i < postingsArr.length; i++) {
            let posting = postingsArr[i];

            console.log('inside loop...', posting.city.toLowerCase())
            console.log('HEYYY', search, posting.city.toLowerCase().includes(search.toLowerCase()))

            if (search && posting.city.toLowerCase().includes(search.toLowerCase())) {
                results.push(posting);
                // console.log('reeeeesults',results)
            } else {
                // error = 'Nothing here! Try a different search.'
            }
        }

        setResults(results)
        // setErrors(error)
    }, [search])


    return (
        <div className='search-container'>
            <input
                className='search-bar'
                placeholder='Search by city...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
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

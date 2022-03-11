import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import { getAllPostings } from '../../store/postings';

import './Search.css'

const Search = () => {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const dispatch = useDispatch();

    // const history = useHistory();
    // const historyCheck = history.location.pathname;

    // console.log('historyyyyy',history.location.pathname)

    // let path = '';

    // const handleClick = () => {
    //     // history.push(`postings/`);

    //     // Three history options = /, /postings/#, /username
    //     if (historyCheck.length === 1) {
    //         path = 'postings/'
    //     } else if (/\/postings\/.*/.test(historyCheck)) {
    //         console.log('it works')
    //         path = '/'
    //     } else {
    //         path = 'postings/'
    //     }
    // }


    useEffect(async () => {
        const results = [];

        const postings = await dispatch(getAllPostings())
        const postingsArr = Object.values(postings);

        for (let i = 0; i < postingsArr.length; i++) {
            let posting = postingsArr[i];

            let checkSearch = posting.city.toLowerCase().includes(search.toLowerCase());

            if (search && checkSearch) {
                results.push(posting);
            }
        }

        setResults(results)
    }, [search]);


    let resultCheck;
    if (search && results.length >= 1) {
        resultCheck = results.map(result => (
            <NavLink className='search-result' onClick={() => {setResults('');}} to={`postings/${result.id}`} key={result.id}>
                <div id='result-title'>{result.title}</div>
                <div id='result-location'>{result.city}, {result.state}</div>
            </NavLink>
            // <Link className='search-result' to={`postings/${result.id}`} onClick={() => setResults('')} key={result.id}>
            //     <div id='result-title'>{result.title}</div>
            //     <div id='result-location'>{result.city}, {result.state}</div>
            // </Link>
            // <div className='search-result' onClick={() => {handleClick(); setResults('');}} key={result.id}>
            //     <div id='result-title'>{result.title}</div>
            //     <div id='result-location'>{result.city}, {result.state}</div>
            // </div>
        ))
    } else if (search && results.length === 0) {
        resultCheck = <div className="search-result">Nothing here! Try a different search...</div>
    };


    // Click outside of search clears search + clean-up to remove event handler
    useEffect(() => {
        document.body.addEventListener('click', clearSearch);
        return () => { window.removeEventListener('click', clearSearch) };
    }, []);

    let clearSearch = () => {
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
                {resultCheck}
            </div>
        </div>
    )
}

export default Search;

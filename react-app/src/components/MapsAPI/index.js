import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Maps.css';

const API_KEY = process.env.REACT_APP_MAPS_API_KEY

const Maps = () => {
    const [loading, setLoading] = useState(true);

    const { postingId } = useParams();
    const posting = useSelector(state => state.postings[postingId]);

    const address = posting?.address;
    const city = posting?.city;
    const state = posting?.state;
    const zipcode = posting?.zipcode;

    // const postingMap = posting.find(post => post.id === +postingId)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div>
            {loading ?
                <div className='loader-container'><div id='loader'></div></div>
                :
                <iframe
                    className='google-map'
                    title='posting-map'
                    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}
                    &q=${address},${city}+${state}+${zipcode}`}>
                </iframe>
            }
        </div>
    )
}


export default Maps;

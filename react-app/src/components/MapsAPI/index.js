import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// import './Maps.css'

let key = process.env.MAPS_API_KEY

const Maps = () => {
    const { postingId } = useParams()
    const posting = useSelector(state => state.postings[postingId])

    console.log('-----------posting', posting)

    let address;
    let city;
    let state;
    let zipcode;

    const loadMap = async () => {
        address = posting[address];
        city = posting[city];
        state = posting[state];
        zipcode = posting[zipcode];
    }

    // const singleMap = businesses.find(single => single.id === +id)

    return (
        <div onLoad={loadMap}>
            <div>hi</div>
            <iframe
                className='google-map'
                title='posting-map'
                src={`https://www.google.com/maps/embed/v1/place?key=${key}
                &q=${address},${city}+${state}+${zipcode}`}>
            </iframe>
        </div>
    )


}


export default Maps;

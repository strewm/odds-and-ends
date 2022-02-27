import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

// import './Maps.css'

const environment = process.env.REACT_APP_MAPS_API_KEY
// console.log(key)

const Maps = () => {
    const { postingId } = useParams()
    const posting = useSelector(state => state.postings[postingId])

    console.log('-----------posting', posting)


    // let address;
    // let city;
    // let state;
    // let zipcode;


    // const loadMap = async () => {
    //     address = posting['address'];
    //     city = posting['city'];
    //     state = posting['state'];
    //     zipcode = posting['zipcode'];
    // }
    // console.log(address, city, state, zipcode)

    console.log(posting?.address)

    const address = posting?.address;
    const city = posting?.city;
    const state = posting?.state;
    const zipcode = posting?.zipcode;

    // const singleMap = businesses.find(single => single.id === +id)

    return (
            // <div>hi</div>
        <div >
            <iframe
                className='google-map'
                title='posting-map'
                src={`https://www.google.com/maps/embed/v1/place?key=${environment}
                &q=${address},${city}+${state}`}>
            </iframe>
        </div>
    )


}


export default Maps;

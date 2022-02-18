import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPickups } from "../../../store/pickups";
import PickupDetail from "./PickupDetail";
// import Footer from "../../Footer";
// import './ViewPosts.css';


const ViewAllPickups = ({ posting }) => {
    const [update, setUpdate] = useState(false);
    const dispatch = useDispatch();

    const viewPickups = useSelector(state => state.pickups);

    useEffect(async () => {
        await dispatch(getAllPickups(posting.id));
        setUpdate(false)
    }, [dispatch, update])

    const viewPickupsArr = Object.values(viewPickups);
    const viewPickupsArrReverse = viewPickupsArr.reverse();

    return (
        <div className='all-posting-container'>
            {viewPickupsArrReverse.map(pickup => (
                <PickupDetail setUpdate={setUpdate} pickup={pickup} key={pickup.id} />
            ))}
        </div>
    )
}

export default ViewAllPickups;

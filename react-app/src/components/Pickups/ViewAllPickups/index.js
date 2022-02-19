import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPickups } from "../../../store/pickups";
import { getSinglePosting } from "../../../store/postings";

import PickupDetail from "./PickupDetail";
// import Footer from "../../Footer";
// import './ViewPosts.css';


const ViewAllPickups = ({ posting, setEditPickup, setDeletePickup }) => {
    const dispatch = useDispatch();

    const viewPickups = useSelector(state => state.postings[posting.id].pickups);
    // const viewPickups = useSelector(state => state.pickups);
    console.log('--------THIS IS POSTING/PICKUP', viewPickups)


    useEffect(() => {
        dispatch(getAllPickups(posting.id));
        dispatch(getSinglePosting(posting.id));

    }, [dispatch, posting.id])

    // const viewPickupsArr = Object.values(viewPickups);
    const viewPickupsArrReverse = viewPickups.reverse();

    return (
        <div className='all-posting-container'>
            {viewPickupsArrReverse.map(pickup => (
                <PickupDetail posting={posting} pickup={pickup} setEditPickup={setEditPickup} setDeletePickup={setDeletePickup} key={pickup.id} />
            ))}
        </div>
    )
}

export default ViewAllPickups;

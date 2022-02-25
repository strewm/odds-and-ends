import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePosting } from "../../../store/postings";
import { getAllPickups } from "../../../store/pickups";
import PickupDetail from "./PickupDetail";


const ViewAllPickups = ({ posting, setEditPickup, setDeletePickup }) => {
    const dispatch = useDispatch();

    const viewPickups = useSelector(state => state.postings[posting.id].pickups);

    useEffect(() => {
        dispatch(getAllPickups(posting.id));
        dispatch(getSinglePosting(posting.id));
    }, [dispatch, posting.id])

    const viewPickupsArrReverse = viewPickups.reverse();

    return (
        <div className='all-pickup-container'>
            <div id='all-pickup-header'>P I C K U P S</div>
            {viewPickupsArrReverse.map(pickup => (
                <PickupDetail posting={posting} pickup={pickup} setEditPickup={setEditPickup} setDeletePickup={setDeletePickup} key={pickup.id} />
            ))}
        </div>
    )
}

export default ViewAllPickups;

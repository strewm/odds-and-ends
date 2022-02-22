import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from "react-router-dom";
// import EditPostingModal from "../EditPostingModal";
// import DeletePostingModal from "../DeletePostingModal";
import DeletePickupModal from "../DeletePickupModal";
import EditPickupModal from "../EditPickupModal";
import './PickupDetail.css';

const PickupDetail = ({ posting, pickup, setEditPickup, setDeletePickup }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    // let color_check = (user_id === posting.user_id ? "#93a365" : "#fefae0")

    const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayCalc = new Date(pickup.date)
    const day = daysWeek[dayCalc.getDay()]
    // console.log('HEYYYYYYY', day)

    return (
        <>
            <div className='pickup-detail-container'>
                <div id='pickup-buttons'>
                    {pickup.user_id === user_id && (
                        <button id="pickup-edit-button"><EditPickupModal posting={posting} pickup={pickup} setEditPickup={setEditPickup} /></button>
                    )}
                    {pickup.user_id === user_id && (
                        <button id="pickup-delete-button"><DeletePickupModal posting={posting} pickup={pickup} setDeletePickup={setDeletePickup} /></button>
                    )}
                </div>
                <div className='pickup-username'>
                    {pickup.user_id} is picking up on...
                    {/* {pickup.username} */}
                </div>
                <div id='pickup-date'>
                    {day}, {pickup.date}
                </div>
            </div>
        </>
    )
}

export default PickupDetail;

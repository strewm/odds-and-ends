import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import EditPickupModal from "../EditPickupModal";
import DeletePickupModal from "../DeletePickupModal";
import './PickupDetail.css';

const PickupDetail = ({ posting, pickup, setEditPickup, setDeletePickup }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    // let color_check = (user_id === posting.user_id ? "#93a365" : "#fefae0")

    const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayCalc = new Date(pickup.date)
    const day = daysWeek[dayCalc.getUTCDay()]
    // console.log('HEYYYYYYY', day)

    return (
        <>
            <div className='pickup-detail-container'>
                <div className='pickup-info'>
                    {pickup.user_id} is picking up on... {day}, {pickup.date}
                    {/* {pickup.username} */}
                </div>
                <div className='pickup-buttons'>
                    {pickup.user_id === user_id && (
                        <div id="pickup-edit-button"><EditPickupModal posting={posting} pickup={pickup} setEditPickup={setEditPickup} /></div>
                    )}
                    {pickup.user_id === user_id && (
                        <div id="pickup-delete-button"><DeletePickupModal posting={posting} pickup={pickup} setDeletePickup={setDeletePickup} /></div>
                    )}
                </div>
            </div>
        </>
    )
}

export default PickupDetail;

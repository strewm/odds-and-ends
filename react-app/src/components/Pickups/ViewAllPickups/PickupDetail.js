import React from "react";
import { useSelector } from 'react-redux';
import EditPickupModal from "../EditPickupModal";
import DeletePickupModal from "../DeletePickupModal";
import './PickupDetail.css';
import { NavLink } from "react-router-dom";

const PickupDetail = ({ posting, pickup, setEditPickup, setDeletePickup }) => {
    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    const daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const dayCalc = new Date(pickup.date)
    const day = daysWeek[dayCalc.getUTCDay()]


    return (
        <>
            <div className='pickup-detail-container'>
                <NavLink to={`/${pickup.username}`}>
                    <div className='pickup-profile-image'
                        style={{
                            backgroundImage: `url(${pickup.profile_picture})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}
                    ></div>
                </NavLink>
                <div className='pickup-info'>
                    {pickup.username} is picking up on ... {day}, {pickup.date}
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

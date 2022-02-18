import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from "react-router-dom";
// import EditPostingModal from "../EditPostingModal";
// import DeletePostingModal from "../DeletePostingModal";
import './PickupDetail.css';

const PickupDetail = ({ pickup }) => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    // let color_check = (user_id === posting.user_id ? "#93a365" : "#fefae0")

    return (
        <>
            <div className='pickup-detail-container'>
                {/* <div id='posting-icon'>
                    {icon}
                    {posting.user_id === user_id && (
                        <button id="home-edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                    {posting.user_id === user_id && (
                        <button id="home-delete-button"><DeletePostingModal posting={posting}/></button>
                    )}
                </div> */}
                <div className='pickup-username'>
                    {pickup.user_id}
                    {/* {pickup.username} */}
                </div>
                <div id='pickup-date'>
                    {pickup.date}
                </div>
            </div>
        </>
    )
}

export default PickupDetail;

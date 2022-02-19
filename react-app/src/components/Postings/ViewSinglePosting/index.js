import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePosting } from "../../../store/postings";

import { useParams, useHistory } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import EditPostingModal from "../EditPostingModal";
import DeletePostingModal from "../DeletePostingModal";
import ViewAllPickups from "../../Pickups/ViewAllPickups";
import { getAllPickups } from "../../../store/pickups";
import CreatePickupModal from "../../Pickups/CreatePickupModal";
// import './PostingDetail.css';

const SinglePosting = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [update, setUpdate] = useState('')

    const { postingId } = useParams();
    // const postId = postingId

    const posting = useSelector(state => state.postings[postingId]);

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    let icon;

    if (posting?.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp"></i>
    } else if (posting?.icon === "Home") {
        icon = <i className="fa-solid fa-chair"></i>
    } else if (posting?.icon === "Supplies") {
        icon = <i className="fa-solid fa-parachute-box"></i>
    } else if (posting?.icon === "Other") {
        icon = <i className="fa-solid fa-otter"></i>
    }

    useEffect(() => {
        dispatch(getAllPickups(postingId))
        dispatch(getSinglePosting(postingId));
        setUpdate(false);
    }, [dispatch, update])


    return (
        <>
            <div className='single-posting-detail-container'>
                {/* {posting?.username} */}
                <div id='single-posting-header'>
                    {icon}
                    {posting?.user_id === user_id && (
                        <button id="edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                    {posting?.user_id === user_id && (
                        <button id="delete-button"><DeletePostingModal posting={posting}/></button>
                    )}
                </div>
                <div className='single-posting-username'>
                    {posting?.username}
                </div>
                <div id='single-posting-title'>
                    <b>{posting?.title}</b>
                </div>
                <div id='single-posting-caption'>
                    <p>{posting?.caption}</p>
                </div>
                <div id='single-posting-address'>
                    <p>{posting?.address}, {posting?.state} {posting?.zipcode}</p>
                </div>
            </div>
            <CreatePickupModal posting={posting} setUpdate={setUpdate}/>
            {posting && <ViewAllPickups posting={posting} />}
        </>
    )
}

export default SinglePosting;

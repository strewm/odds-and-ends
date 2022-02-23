import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePosting, getAllPostings } from "../../../store/postings";

import { useParams, useHistory, NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import EditPostingModal from "../EditPostingModal";
import DeletePostingModal from "../DeletePostingModal";
import ViewAllPickups from "../../Pickups/ViewAllPickups";
import { getAllPickups } from "../../../store/pickups";
import CreatePickupModal from "../../Pickups/CreatePickupModal";

import { savePosting, unsavePosting } from "../../../store/saved";
// import './PostingDetail.css';

const SinglePosting = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [update, setUpdate] = useState('');
    const [editPickup, setEditPickup] = useState('');
    const [deletePickup, setDeletePickup] = useState('');

    const [saved, setSaved] = useState([]);

    const { postingId } = useParams();
    // const postId = postingId

    const posting = useSelector(state => state.postings[postingId]);

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    const username = current_user.username;

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

    useEffect(async () => {
        dispatch(getAllPickups(postingId))
        dispatch(getSinglePosting(postingId));
        // dispatch(getAllPostings());

        const res_saved = await fetch(`/api/saved/posting/${postingId}/saved`);
        const save = await res_saved.json();
        setSaved(save);

        setUpdate(false);
        setEditPickup(false);
        setDeletePickup(false);
    }, [dispatch, update, editPickup, deletePickup])


    const handleSave = async () => {
        console.log('-----HANDLE SAVE', username, postingId)
        await dispatch(savePosting(username, postingId));
    };

    const handleUnsave = async () => {
        await dispatch(unsavePosting(username, postingId));
    };

    let save;
    if (saved[user_id]) {
        save = <i id='bookmark' className="fa-solid fa-bookmark" style={{ "color": "#e94943" }} onClick={() => handleUnsave()}></i>
    } else {
        save = <i id='un-bookmark' className="fa-regular fa-bookmark" onClick={() => handleSave()}></i>
    }



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
                <NavLink to={`/${posting?.username}`} className='single-posting-username'>
                    {posting?.username}
                </NavLink>
                <div id='single-posting-title'>
                    <b>{posting?.title}</b>
                </div>
                <div id='single-posting-caption'>
                    <p>{posting?.caption}</p>
                </div>
                <div id='single-posting-address'>
                    <p>{posting?.address}, {posting?.state} {posting?.zipcode}</p>
                </div>
                {save}
            </div>
            <CreatePickupModal posting={posting} setUpdate={setUpdate}/>
            {posting && <ViewAllPickups posting={posting} setEditPickup={setEditPickup} setDeletePickup={setDeletePickup} />}
        </>
    )
}

export default SinglePosting;

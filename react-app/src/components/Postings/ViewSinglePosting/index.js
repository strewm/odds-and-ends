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

import { getPostSaved, savePosting, unsavePosting } from "../../../store/saved";
import './SinglePosting.css';

const SinglePosting = () => {
    const dispatch = useDispatch();

    const [update, setUpdate] = useState(false);
    const [editPickup, setEditPickup] = useState(false);
    const [deletePickup, setDeletePickup] = useState(false);
    const [saved, setSaved] = useState([]);
    const [saveUpdate, setSaveUpdate] = useState(false)

    const { postingId } = useParams();

    const posting = useSelector(state => state.postings[postingId]);
    const current_user = useSelector(state => state.session.user);
    
    const user_id = current_user.id;
    const username = current_user.username;

    let icon;
    if (posting?.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp"></i>
    } else if (posting?.icon === "Home") {
        icon = <i className="fa-solid fa-bath"></i>
    } else if (posting?.icon === "Supplies") {
        icon = <i className="fa-solid fa-box-tissue"></i>
    } else if (posting?.icon === "Other") {
        icon = <i className="fa-solid fa-box-archive"></i>
    };

    useEffect(async () => {
        await dispatch(getAllPickups(postingId));
        await dispatch(getSinglePosting(postingId));

        const res_saved = await fetch(`/api/saved/posting/${postingId}/saved`);
        const save = await res_saved.json();
        setSaved(save);

        setSaveUpdate(false);
        setUpdate(false);
        setEditPickup(false);
        setDeletePickup(false);
    }, [dispatch, saveUpdate, update, editPickup, deletePickup])


    const handleSave = async () => {
        await dispatch(savePosting(username, postingId));
        setSaveUpdate(true);
    };

    const handleUnsave = async () => {
        await dispatch(unsavePosting(username, postingId));
        setSaveUpdate(true);
    };

    let save;
    if (saved[user_id]) {
        save = <i id='bookmark' className="fa-solid fa-bookmark" style={{ "color": "#fefae0" }} onClick={() => handleUnsave()}></i>
    } else {
        save = <i id='un-bookmark' className="fa-regular fa-bookmark" onClick={() => handleSave()}></i>
    }

    let buttons;
    if (posting?.user_id === user_id) {
        buttons =
        <div className='single-posting-buttons'>
            <div id="single-edit-button"><EditPostingModal posting={posting}/></div>
            <div id="single-delete-button"><DeletePostingModal posting={posting}/></div>
        </div>;
    } else {
        buttons = <div className='single-posting-buttons'></div>;
    }


    return (
        <div className='single-posting-container'>
            <div className='single-posting-detail-container'>
                {save}
                <div className='single-posting-header'>
                    <div id='single-posting-icon'>
                        {icon}
                    </div>
                    {buttons}
                    {/* {posting?.user_id === user_id && (
                        <button id="edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                    {posting?.user_id === user_id && (
                        <button id="delete-button"><DeletePostingModal posting={posting}/></button>
                    )} */}
                    <NavLink to={`/${posting?.username}`} id='single-posting-username'>
                        {posting?.username}
                    </NavLink>
                </div>
                <div id='single-posting-title'>
                    <p>{posting?.title}</p>
                </div>
                <div id='single-posting-caption'>
                    <p>{posting?.caption}</p>
                </div>
                <div id='single-posting-address'>
                    <p>{posting?.address}, {posting?.state} {posting?.zipcode}</p>
                </div>
            </div>
            <CreatePickupModal posting={posting} setUpdate={setUpdate}/>
            {posting && <ViewAllPickups posting={posting} setEditPickup={setEditPickup} setDeletePickup={setDeletePickup} />}
        </div>
    )
}

export default SinglePosting;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostings, deleteOnePosting } from "../../../store/postings";
import { NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
// import SinglePosting from "../ViewSinglePosting";
// import EditPostingModal from "../EditPostingModal";
// import './PostingDetail.css';

const DeletePosting = ({ setShowModal, posting }) => {
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    // let icon;

    // if (posting.icon === "Food") {
    //     icon = <i className="fa-solid fa-shrimp"></i>
    // } else if (posting.icon === "Home") {
    //     icon = <i className="fa-solid fa-chair"></i>
    // } else if (posting.icon === "Supplies") {
    //     icon = <i className="fa-solid fa-parachute-box"></i>
    // } else if (posting.icon === "Other") {
    //     icon = <i className="fa-solid fa-otter"></i>
    // }

    // useEffect(async () => {
    //     dispatch(getAllPostings())
    // }, [dispatch])


    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteOnePosting(posting.id))
        setShowModal(false)
            // .then(history.push('/'))
        // setUpdate(true)
        return;
    }


    return (
        <>
            <div className='posting-detail-container'>
                <div>Confirm Delete</div>
                {posting.user_id === user_id && (
                    <button id="home-delete-button" onClick={(e) => handleDelete(e)}>Delete</button>
                )}
                {/* <div id='posting-icon'>
                    {icon}
                    {posting.user_id === user_id && (
                        <button id="home-edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                </div>
                <NavLink to={`/postings/${posting.id}`} style={{ textDecoration: 'none' }}>
                    <div className='posting-username'>
                        {posting.user_id}
                    </div>
                    <div id='posting-title'>
                        <b>{posting.title}</b>
                    </div>
                    <div id='posting-caption'>
                        <p>{posting.caption}</p>
                    </div>
                </NavLink> */}
            </div>
        </>
    )
}

export default DeletePosting;

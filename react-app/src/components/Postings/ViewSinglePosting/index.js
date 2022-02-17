import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostings, deleteOnePosting } from "../../../store/postings";
import { useParams, NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
// import './PostingDetail.css';

const SinglePosting = () => {
    const dispatch = useDispatch();

    const { postingId } = useParams();
    console.log('+++++ID', postingId);
    const posting = useSelector(state => state.postings[postingId]);
    // const posting = useSelector(state => state)

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    console.log('--------POSTING', posting)

    let icon;

    if (posting.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp"></i>
    } else if (posting.icon === "Home") {
        icon = <i className="fa-solid fa-chair"></i>
    } else if (posting.icon === "Supplies") {
        icon = <i className="fa-solid fa-parachute-box"></i>
    } else if (posting.icon === "Other") {
        icon = <i className="fa-solid fa-otter"></i>
    }

    useEffect(async () => {
        dispatch(getAllPostings())
    }, [dispatch])

    // const handleDelete = async () => {
    //     dispatch(deleteOnePosting(posting.id));

    // }


    return (
        <>
            <div className='posting-detail-container'>
                <div id='posting-icon'>
                    {icon}
                </div>
                <div className='posting-username'>
                    {posting.user_id}
                </div>
                <div id='posting-caption'>
                    <p><b>{posting.title}</b> {posting.caption}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePosting;

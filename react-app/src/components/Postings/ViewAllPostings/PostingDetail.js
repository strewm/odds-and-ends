import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostings } from "../../../store/postings";
// import { NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import './PostingDetail.css';

const PostingDetail = ({ posting }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    let icon;

    if (posting.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp"></i>
    } else if (posting.icon === "Home") {
        icon = <i class="fa-solid fa-chair"></i>
    } else if (posting.icon === "Supplies") {
        icon = <i class="fa-solid fa-parachute-box"></i>
    } else if (posting.icon === "Other") {
        icon = <i class="fa-solid fa-otter"></i>
    }

    useEffect(async () => {
        dispatch(getAllPostings())

    }, [dispatch])


    return (
        <>
            <div className='posting-detail-container'>
                <div id='posting-icon'>
                    {icon}
                </div>
                <div className='posting-username'>
                    {posting.user_id}
                    {/* <NavLink to={`/profile/${posting.user_id}`}>
                        {posting.username}
                    </NavLink> */}
                </div>
                <div id='posting-caption'>
                    <p><b>{posting.title}</b> {posting.caption}</p>
                </div>
            </div>
        </>
    )
}

export default PostingDetail;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostings } from "../../../store/postings";
// import { NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import './PostingDetail.css';

const PostingDetail = ({ posting }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    useEffect(async () => {
        dispatch(getAllPostings())

    }, [dispatch])


    return (
        <>
            <div className='posting-detail-container'>
                <div className='posting-username'>
                    {posting.user_id}
                    {/* <NavLink to={`/profile/${posting.user_id}`}>
                        {posting.username}
                    </NavLink> */}
                </div>
                <div id='posting-caption'>
                    <p><b>{posting.title}</b> {posting.caption}</p>
                </div>
                <div id='posting-icon'>
                    {posting.icon}
                </div>
            </div>
        </>
    )
}

export default PostingDetail;

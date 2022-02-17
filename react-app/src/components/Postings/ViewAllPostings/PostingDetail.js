import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostings } from "../../../store/postings";
// import { NavLink } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
// import './PostDetail.css';

const PostingDetail = ({ posting }) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)


    useEffect(async () => {
        dispatch(getAllPostings())

    }, [dispatch])


    return (
        <>
            <div className='post-detail-container'>
                <div className='post-username'>
                    {posting.user_id}
                    {/* <NavLink to={`/profile/${posting.user_id}`}>
                        {posting.username}
                    </NavLink> */}
                </div>
                <div className='post-caption'>
                    <p><b>{posting.name}</b> {posting.caption}</p>
                </div>
            </div>
        </>
    )
}

export default PostingDetail;

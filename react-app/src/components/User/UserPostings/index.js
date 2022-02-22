import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";

import { getAllPostings } from "../../../store/postings";
import { getUserPosts } from "../../../store/postings";
import PostingDetail from "../../Postings/ViewAllPostings/PostingDetail";
import EditPostingModal from "../../Postings/EditPostingModal";
import DeletePostingModal from "../../Postings/DeletePostingModal";
// import './ViewPosts.css';


const UserPostings = ({ posting }) => {
    // const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();
    // const viewUserPostings = useSelector(state => state.postings);
    // console.log('----------POSTS?', viewUserPostings)

    const { username } = useParams();


    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    let icon;
    let color_check = (user_id === posting.user_id ? "#93a365" : "#fefae0")

    if (posting.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp" style={{color: color_check}}></i>
    } else if (posting.icon === "Home") {
        icon = <i className="fa-solid fa-chair" style={{color: color_check}}></i>
    } else if (posting.icon === "Supplies") {
        icon = <i className="fa-solid fa-parachute-box" style={{color: color_check}}></i>
    } else if (posting.icon === "Other") {
        icon = <i className="fa-solid fa-otter" style={{color: color_check}}></i>
    }


    return (
        <>
            <div>hi</div>
            <div className='posting-detail-container' style={{color: color_check}}>
                <div id='posting-icon'>
                    {icon}
                    {/* {posting.user_id === user_id && (
                        <button id="home-edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                    {posting.user_id === user_id && (
                        <button id="home-delete-button"><DeletePostingModal posting={posting}/></button>
                    )} */}
                </div>
                <NavLink to={`/postings/${posting.id}`} style={{ textDecoration: 'none' }}>
                    <div className='posting-username' style={{color: color_check}}>
                        {username}
                    </div>
                    <div id='posting-title' style={{color: color_check}}>
                        {posting.title}
                    </div>
                    <div id='posting-caption' style={{color: color_check}}>
                        {posting.caption}
                    </div>
                </NavLink>
            </div>
        </>

    )
}

export default UserPostings;

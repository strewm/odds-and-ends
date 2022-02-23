import React from "react";
import { useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import EditPostingModal from "../EditPostingModal";
import DeletePostingModal from "../DeletePostingModal";
import './PostingDetail.css';


const PostingDetail = ({ posting }) => {
    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    let icon;
    let color_check = (user_id === posting.user_id ? "#93a365" : "#fefae0");

    if (posting.icon === "Food") {
        icon = <i className="fa-solid fa-shrimp" style={{color: color_check}}></i>
    } else if (posting.icon === "Home") {
        icon = <i className="fa-solid fa-chair" style={{color: color_check}}></i>
    } else if (posting.icon === "Supplies") {
        icon = <i className="fa-solid fa-parachute-box" style={{color: color_check}}></i>
    } else if (posting.icon === "Other") {
        icon = <i className="fa-solid fa-otter" style={{color: color_check}}></i>
    }

    const url_checker = useParams();
    let buttons;

    if (url_checker.username) {
        buttons = <div className='home-posting-buttons'><span></span></div>;
    } else {
        buttons =
        <div className='home-posting-buttons'>
            {posting.user_id === user_id && (
                <button id="home-edit-button"><EditPostingModal posting={posting}/></button>
            )}
            {posting.user_id === user_id && (
                <button id="home-delete-button"><DeletePostingModal posting={posting}/></button>
            )}
        </div>;
    };


    return (
        // <>
            <div className='posting-detail-container' style={{color: color_check}}>
                <div className='posting-header'>
                    <div id='posting-icon'>
                        {icon}
                    </div>
                    {buttons}
                </div>
                <NavLink to={`/postings/${posting.id}`} className='posting-navlink-container' style={{ textDecoration: 'none' }}>
                    <div id='posting-username' style={{color: color_check}}>
                        {posting.username}
                    </div>
                    <div id='posting-title' style={{color: color_check}}>
                        {posting.title}
                    </div>
                    <div id='posting-caption' style={{color: color_check}}>
                        {posting.caption}
                    </div>
                </NavLink>
            </div>
        // </>
    )
}

export default PostingDetail;

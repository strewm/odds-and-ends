import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getSinglePosting, deleteOnePosting } from "../../../store/postings";
import { useParams, useHistory } from "react-router-dom";
// import ViewSinglePost from "../ViewSinglePost/ViewSinglePostModal";
import EditPostingModal from "../EditPostingModal";
import DeletePostingModal from "../DeletePostingModal";
// import './PostingDetail.css';

const SinglePosting = () => {
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const { postingId } = useParams();
    // const postId = postingId
    const posting = useSelector(state => state.postings[postingId]);

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

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

    useEffect(() => {
        dispatch(getSinglePosting());

        setUpdate(false)
    }, [dispatch, update])

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteOnePosting(posting.id))
            .then(history.push('/'))
        setUpdate(true)
        return;
    }


    return (
        <>
            <div className='single-posting-detail-container'>
                <div id='single-posting-header'>
                    {icon}
                    {posting.user_id === user_id && (
                        <button id="edit-button"><EditPostingModal posting={posting}/></button>
                    )}
                    {posting.user_id === user_id && (
                        <button id="delete-button"><DeletePostingModal posting={posting}/></button>
                    )}
                </div>
                <div className='single-posting-username'>
                    {posting.user_id}
                </div>
                <div id='single-posting-title'>
                    <b>{posting.title}</b>
                </div>
                <div id='single-posting-caption'>
                    <p>{posting.caption}</p>
                </div>
                <div id='single-posting-address'>
                    <p>{posting.address}, {posting.state} {posting.zipcode}</p>
                </div>
            </div>
        </>
    )
}

export default SinglePosting;

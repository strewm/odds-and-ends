import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteOnePosting } from "../../../store/postings";
// import './PostingDetail.css';

const DeletePosting = ({ setShowModal, posting }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    useEffect(() => {
		return () => {setShowModal(false)}
	}, [setShowModal]);

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteOnePosting(posting.id))
        setShowModal(false);
        history.push('/');
    }


    return (
        <>
            <div className='posting-detail-container'>
                <div>Confirm Delete</div>
                {posting.user_id === user_id && (
                    <button id="home-delete-button" onClick={handleDelete}>Confirm</button>
                    // <button id="home-delete-button" type='submit' onSubmit={handleSubmit}>Confirm</button>
                )}
            </div>
        </>
    )
}

export default DeletePosting;

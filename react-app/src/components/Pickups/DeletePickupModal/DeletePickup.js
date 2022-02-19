import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteOnePickup } from "../../../store/pickups";
// import { getAllPostings } from "../../../store/postings";
// import './PostingDetail.css';

const DeletePickup = ({ setShowModal, posting, pickup, setDeletePickup }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;

    useEffect(() => {
		return () => {setShowModal(false)}
	}, []);

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteOnePickup(pickup.id))
            .then(history.push(`/postings/${posting.id}`))
        setShowModal(false)
        setDeletePickup(true)
        return;
    }


    return (
        <>
            <div className='posting-detail-container'>
                <div>Confirm Delete Scheduling</div>
                <button id="home-delete-button" onClick={handleDelete}>Confirm</button>
                {/* // <button id="home-delete-button" type='submit' onSubmit={handleSubmit}>Confirm</button> */}
            </div>
        </>
    )
}

export default DeletePickup;

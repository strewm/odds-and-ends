import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteOnePosting } from "../../../store/postings";
import '../Posting.css';

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
            <div className='confirm-delete-container'>
                <div>C O N F I R M &nbsp;&nbsp; D E L E T E</div>
                {posting.user_id === user_id && (
                    <button className="confirm-delete" onClick={handleDelete}>Confirm</button>
                )}
            </div>
        </>
    )
}

export default DeletePosting;

import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { deleteOnePickup } from "../../../store/pickups";
import '../../Postings/Posting.css';

const DeletePickup = ({ setShowModal, posting, pickup, setDeletePickup }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // const current_user = useSelector(state => state.session.user);
    // const user_id = current_user.id;

    useEffect(() => {
		return () => {setShowModal(false)}
	}, [setShowModal]);

    const handleDelete = async (e) => {
        e.preventDefault();

        await dispatch(deleteOnePickup(pickup.id))
        history.push(`/postings/${posting.id}`)
        setShowModal(false)
        setDeletePickup(true)
        return;
    }


    return (
        <>
            <div className='confirm-delete-container'>
                <div>C O N F I R M &nbsp;&nbsp; D E L E T E</div>
                <button className="confirm-delete" onClick={handleDelete}>Confirm</button>
            </div>
        </>
    )
}

export default DeletePickup;

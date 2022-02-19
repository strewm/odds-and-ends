import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateOnePickup } from "../../../store/pickups"
// import './CreatePosting.css';


const EditPickup = ({ setShowModal, posting, pickup, setEditPickup }) => {
    const [date, setDate] = useState(pickup.date);
    const [errors, setErrors] = useState({});
    // const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    // const current_user = useSelector(state => state.session.user);
    // const user_id = current_user.id;

    const posting_id = posting.id;
    const pickup_id = pickup.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {posting_id, pickup_id, date};
        const data = await dispatch(updateOnePickup(info));

        if (data) {
            const errors = {};

            data.forEach(error => {
                const errLabel = error.split(' : ')[0];
                const errMessage = error.split(' : ')[1];
                errors[errLabel] = errMessage;
            });

            setErrors(errors);
            return;
        } else {
            setShowModal(false);
            setEditPickup(true);
        }
    }


    return (
        <div className='create-posting-container'>
            <div>Edit scheduling</div>
            <form className='create-posting-form' onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Date</legend>
                    <input
                        name='date'
                        type='text'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.date ? `${errors.date}` : ''}
                </div>
                <button id='new-post-share' type="submit">Submit Edit</button>
            </form>
        </div>
    )
}

export default EditPickup;

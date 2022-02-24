import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { updateOnePickup } from "../../../store/pickups"
import '../CreatePickupModal/Pickup.css';


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

    const disablePreviousDates = () => {
        const today = new Date();

        const yyyy = today.getFullYear();
        const mm = (today.getMonth() + 1).toString().padStart(2, "0");
        const dd = (today.getDate()).toString().padStart(2, "0");

        return yyyy + "-" + mm + "-" + dd;
    };


    return (
        <div className='edit-pickup-container'>
            <div>E D I T &nbsp; P I C K U P</div>
            <form className='edit-pickup-form' onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Date</legend>
                    <input
                        name='date'
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={disablePreviousDates()}
                    />
                </fieldset>
                <div className="errors">
                    {errors.date ? `${errors.date}` : ''}
                </div>
                <button id='edit-pickup-submit' type="submit">Submit Edit</button>
            </form>
        </div>
    )
}

export default EditPickup;

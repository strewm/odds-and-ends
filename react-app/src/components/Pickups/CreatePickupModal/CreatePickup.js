import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import * as postActions from '../../../store/post';
import { addPickup } from "../../../store/pickups";
import './Pickup.css';


const CreatePickup = ({ setShowModal, setUpdate, posting }) => {
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    // console.log('---------user id', typeof(user_id))

    const posting_id = posting.id;

    // useEffect(() => {
    //     dispatch(getAllPickups(posting_id));
    //     dispatch(getSinglePosting(posting_id));
    // }, [dispatch, setShowModal])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {user_id, posting_id, date};
        const data = await dispatch(addPickup(info));

        if (data) {
            // console.log('============ERRORS', data)
            const errors = {}

            data.forEach(error => {
                const errLabel = error.split(' : ')[0];
                const errMessage = error.split(' : ')[1];
                errors[errLabel] = errMessage;
            });

            setErrors(errors);
            return;
        } else {
            setShowModal(false);
            setUpdate(true);
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
        <div className='create-pickup-container'>
            <div>S C H E D U L E &nbsp; N E W &nbsp; P I C K U P</div>
            <form className='create-pickup-form' onSubmit={handleSubmit}>
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
                <button id='create-pickup-submit' type="submit">Schedule</button>
            </form>
        </div>
    )
}

export default CreatePickup;

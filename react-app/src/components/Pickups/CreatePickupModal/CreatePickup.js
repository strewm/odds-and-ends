import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import * as postActions from '../../../store/post';
import { addPickup, getAllPickups } from "../../../store/pickups";
import { getSinglePosting } from "../../../store/postings";
import './CreatePickup.css';


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
        console.log('---------year', yyyy)

        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        console.log('---------month', mm)

        const dd = String(today.getDate()).padStart(2, "0");
        console.log('---------day', dd)

        // const day = date.getDay()
        // console.log('---------day', day)

        return yyyy + "-" + mm + "-" + dd;
    };


    return (
        <div className='create-pickup-container'>
            <div>Schedule new pickup</div>
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
                <button id='new-post-share' type="submit">Schedule</button>
            </form>
        </div>
    )
}

export default CreatePickup;

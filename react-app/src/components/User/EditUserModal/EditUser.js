import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { updateUserProfile } from "../../../store/session";
import './EditUser.css';


const EditUser = ({ setShowModal }) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();


    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    // console.log('---------user id', typeof(user_id))

    useEffect(() => {
		return () => {setShowModal(false)}
	}, [setShowModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('profile_picture', profilePicture);

        const data = await dispatch(updateUserProfile(formData, user_id));

        if (data) {
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
            // history.push('/');
        }
    }

    const updateProfilePicture = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    return (
        <div className='posting-container'>
            <div>U P D A T E &nbsp;&nbsp; P R O F I L E</div>
            <form className='posting-form' onSubmit={handleSubmit}>
                <div>
                    <input
                        id='profile-pic'
                        type="file"
                        accept="image/*"
                        required={false}
                        onChange={updateProfilePicture}
                    />
                </div>
                {/* <label className='signup-inputs' htmlFor='profile-pic'>Upload profile picture (not required)</label> */}
                <div className="errors">
                    {errors.profile_picture ? `${errors.profile_picture}` : ''}
                </div>
                <button id='post-submit' type="submit">Share</button>
            </form>
        </div>
    )
}

export default EditUser;

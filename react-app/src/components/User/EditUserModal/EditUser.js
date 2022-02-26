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

    useEffect(() => {
		return () => {setShowModal(false)}
	}, [setShowModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('profile_picture', profilePicture);

        const data = await dispatch(updateUserProfile(formData, user_id));


        if (data) {
            console.log('-------edit user', data)
            const errors = {}

            data?.forEach(error => {
                const errLabel = error.split(' : ')[0];
                const errMessage = error.split(' : ')[1];
                errors[errLabel] = errMessage;
            });

            setErrors(errors);
            return;
        } else {
            setShowModal(false);
            history.push(`/${current_user.username}`);
        }
    }

    const updateProfilePicture = (e) => {
        const file = e.target.files[0];
        setProfilePicture(file);
    };

    let preview;
    if (!profilePicture) {
        preview = <img id='old-image-preview' src={current_user.profile_picture} alt='image-preview'/>
    } else {
        preview = <img id='new-image-preview' src={URL.createObjectURL(profilePicture)} alt='image-preview'/>
    }


    return (
        <div className='edit-user-container'>
            <div>U P D A T E &nbsp;&nbsp; P R O F I L E</div>
            {preview}
            <form className='edit-user-form' onSubmit={handleSubmit}>
                <fieldset>
                    <input
                        id='edit-profile-pic'
                        type="file"
                        accept="image/*"
                        required={false}
                        onChange={updateProfilePicture}
                    />
                </fieldset>
                {/* <label className='signup-inputs' htmlFor='profile-pic'>Upload profile picture (not required)</label> */}
                <div className="errors">
                    {errors.profile_picture ? `${errors.profile_picture}` : ''}
                </div>
                <button id='edit-submit' type="submit">Update</button>
            </form>
        </div>
    )
}

export default EditUser;

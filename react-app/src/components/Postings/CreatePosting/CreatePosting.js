import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
// import * as postActions from '../../../store/post';
import { addPosting } from "../../../store/postings";
// import './UploadPost.css';


const CreatePosting = ({ setShowModal }) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState(null)
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [icon, setIcon] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user)
    const user_id = current_user.id


    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {user_id, address, city, state, zipcode, title, caption, icon};
        const data = await dispatch(addPosting(info));

        if (data) {
            setErrors(data)
        } else {
            setShowModal(false)
        }

    }



    return (
        <div className='create-post-container'>
            <div>Create new posting</div>
            <form className='create-post-form' onSubmit={handleSubmit}>
                <ul className='errors'>
                    <li className="errors">
                        {errors}
                    </li>
                </ul>
                <fieldset>
                    <legend>Address</legend>
                    <input
                        name='address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>City</legend>
                    <input
                        name='city'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>State</legend>
                    <input
                        name='state'
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Zipcode</legend>
                    <input
                        name='zipcode'
                        type='text'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Post Title</legend>
                    <input
                        name='title'
                        type='textarea'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Post Caption</legend>
                    <input
                        name='caption'
                        type='textarea'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </fieldset>
                <fieldset>
                    <legend>Icon</legend>
                    <input
                        name='icon'
                        type='textarea'
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                    />
                </fieldset>
                <button id='new-post-share' type="submit">Share</button>
            </form>
        </div>
    )
}

export default CreatePosting;

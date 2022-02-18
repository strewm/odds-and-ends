import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import * as postActions from '../../../store/post';
import { updateOnePosting } from "../../../store/postings";
// import './CreatePosting.css';


const EditPosting = ({ setShowModal, posting }) => {
    const [address, setAddress] = useState(posting.address);
    const [city, setCity] = useState(posting.city);
    const [state, setState] = useState(posting.state);
    const [zipcode, setZipcode] = useState(posting.zipcode);
    const [title, setTitle] = useState(posting.title);
    const [caption, setCaption] = useState(posting.caption);
    const [icon, setIcon] = useState('');
    const [errors, setErrors] = useState({});
    // const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();

    // const current_user = useSelector(state => state.session.user);
    // const user_id = current_user.id;

    const posting_id = posting.id;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {posting_id, address, city, state, zipcode, title, caption, icon};
        const data = await dispatch(updateOnePosting(info));

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
        }
    }

    let iconDropdown = [
        { label: 'Food' },
        { label: 'Home' },
        { label: 'Supplies' },
        { label: 'Other' },
    ];

    let handleIconChange = (e) => {
        setIcon(e.target.value)
    };


    return (
        <div className='create-posting-container'>
            <div>Create new posting</div>
            <div id='create-icon'>
                {icon}
            </div>
            <form className='create-posting-form' onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Address</legend>
                    <input
                        name='address'
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.address ? `${errors.address}` : ''}
                </div>
                <fieldset>
                    <legend>City</legend>
                    <input
                        name='city'
                        type='text'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.city ? `${errors.city}` : ''}
                </div>
                <fieldset>
                    <legend>State</legend>
                    <input
                        name='state'
                        type='text'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.state ? `${errors.state}` : ''}
                </div>
                <fieldset>
                    <legend>Zipcode</legend>
                    <input
                        name='zipcode'
                        type='text'
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.zipcode ? `${errors.zipcode}` : ''}
                </div>
                <fieldset>
                    <legend>Post Title</legend>
                    <input
                        name='title'
                        type='textarea'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.title ? `${errors.title}` : ''}
                </div>
                <fieldset>
                    <legend>Post Caption</legend>
                    <input
                        name='caption'
                        type='textarea'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.caption ? `${errors.caption}` : ''}
                </div>
                <select onChange={handleIconChange}>
                    <option value=''>Select an icon</option>
                    {iconDropdown.map((icon) => <option key={icon.label} value={icon.label}>{icon.label}</option>)}
                </select>
                <div className="errors">
                    {errors.icon ? `${errors.icon}` : ''}
                </div>
                <button id='new-post-share' type="submit">Share</button>
            </form>
        </div>
    )
}

export default EditPosting;

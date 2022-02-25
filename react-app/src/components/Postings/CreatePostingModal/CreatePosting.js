import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { addPosting } from "../../../store/postings";
import './CreatePosting.css';


const CreatePosting = ({ setShowModal }) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [icon, setIcon] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    const current_user = useSelector(state => state.session.user);
    const user_id = current_user.id;
    // console.log('---------user id', typeof(user_id))


    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {user_id, address, city, state, zipcode, title, caption, icon};
        const data = await dispatch(addPosting(info));

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
            history.push('/');
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
        <div className='posting-container'>
            <div>C R E A T E &nbsp;&nbsp; N E W &nbsp;&nbsp; P O S T I N G</div>
            <form className='posting-form' onSubmit={handleSubmit}>
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
                    <textarea
                        name='caption'
                        type='textarea'
                        rows='10'
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </fieldset>
                <div className="errors">
                    {errors.caption ? `${errors.caption}` : ''}
                </div>
                <fieldset>
                    <select onChange={handleIconChange}>
                        <option value=''>Select an icon</option>
                        {iconDropdown.map((icon) => <option key={icon.label} value={icon.label}>{icon.label}</option>)}
                    </select>
                </fieldset>
                <div className="errors">
                    {errors.icon ? `${errors.icon}` : ''}
                </div>
                <button id='post-submit' type="submit">Share</button>
            </form>
        </div>
    )
}

export default CreatePosting;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import * as postActions from '../../../store/post';
import { addPosting } from "../../../store/postings";
import './CreatePosting.css';


const CreatePosting = ({ setShowModal }) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [icon, setIcon] = useState('')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch();

    const current_user = useSelector(state => state.session.user)
    const user_id = current_user.id
    console.log('---------user id', typeof(user_id))


    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = {user_id, address, city, state, zipcode, title, caption, icon};
        const data = await dispatch(addPosting(info));

        if (data) {
            // console.log('============ERRORS', data)
            const errors = {}

            data.forEach(error => {
                const errLabel = error.split(' : ')[0]
                const errMessage = error.split(' : ')[1]
                errors[errLabel] = errMessage
            })
            setErrors(errors)
            console.log(errors)
            return
        } else {
            setShowModal(false)
        }
    }

    let iconDropdown = [
        { label: 'Food', value: '🥕' },
        { label: 'Home', value: '🏠' },
        { label: 'Supplies', value: '🪵' },
        { label: 'Other', value: '✅' },
    ]

    let handleIconChange = (e) => {
        setIcon(e.target.value)
    }


    return (
        <div className='create-posting-container'>
            <div>Create new posting</div>
            <div id='create-icon'>
                    {icon}
            </div>
            <form className='create-posting-form' onSubmit={handleSubmit}>
                {/* <ul className='errors'>
                    <li className="errors">
                        {errors}
                    </li>
                </ul> */}
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
                {/* <fieldset>
                    <legend>Icon</legend>
                    <input
                        name='icon'
                        type='textarea'
                        value={icon}
                        onChange={(e) => setIcon(e.target.value)}
                    />
                </fieldset> */}
                <select onChange={handleIconChange}>
                    <option value=''>Select an icon</option>
                    {iconDropdown.map((icon) => <option key={icon.label} value={icon.label}>{icon.label}</option>)}
                </select>
                <button id='new-post-share' type="submit">Share</button>
            </form>
        </div>
    )
}

export default CreatePosting;

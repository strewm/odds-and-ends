import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { getUserProfile } from '../../../store/users';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState("")

    const { username } = useParams();
    // console.log('+++++++++COMPONENT', username)
    // const dispatch = useDispatch();

    //   const userObj = useSelector(state => state.users[username]);
    //   console.log(userObj);

    useEffect(async () => {
        if (!username) return;

        const response = await fetch(`/api/users/${username}`);

        if (response.ok) {
            const user = await response.json();
            setUser(user);
        } else {
            // console.log('erroooooors')
            setErrors("User does not exist.");
        }

        // await dispatch(getUserProfile(username));
    }, [username]);

    if (!user) {
        return null;
    }

    return (
        <>
            {/* <div>hi</div> */}
            {/* <ul className='errors'>
                <li className="errors">
                    {errors}
                </li>
            </ul> */}
            {/* <div>{user.username}</div> */}
            <ul>
                <li>
                    <strong>Username:</strong> {user.username} {errors}
                </li>
                <li>
                    <strong>User ID:</strong> {user.id}
                </li>
                <li>
                    <strong>Email:</strong> {user.email}
                </li>
            </ul>
        </>
    );
}

export default UserProfile;

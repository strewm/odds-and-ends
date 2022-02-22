import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostingDetail from '../../Postings/ViewAllPostings/PostingDetail';
// import { getUserProfile } from '../../../store/users';
import UserPostings from '../UserPostings';
// import PostingDetail from '../../Postings/ViewAllPostings/PostingDetail';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [postings, setPostings] = useState({});
    const [errors, setErrors] = useState("");

    const { username } = useParams();


    useEffect(async () => {
        if (!username) return;

        const res_user = await fetch(`/api/users/${username}`);
        const res_posts = await fetch(`/api/postings/user/${username}/postings`);

        if (res_user.ok) {
            const user = await res_user.json();
            setUser(user);
        } else {
            // console.log('erroooooors')
            setErrors("User does not exist.");
        }

        if (res_posts.ok) {
            const postings = await res_posts.json();
            setPostings(postings);
        }


        // await dispatch(getUserProfile(username));
    }, [username]);

    const viewUserPostingsArr = Object.values(postings);
    const viewUserPostingsReverse = viewUserPostingsArr.reverse();

    console.log('-------profile component', postings)

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
            {/* <UserPostings /> */}
            <div className='profile-grid-container'>
                {viewUserPostingsReverse?.map(posting => {
                    return <PostingDetail posting={posting} key={posting.id}/>
                    // return <UserPostings posting={posting} key={posting.id}/>
                })}
            </div>
        </>
    );
}

export default UserProfile;

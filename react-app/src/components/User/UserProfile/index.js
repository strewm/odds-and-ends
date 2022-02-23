import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostingDetail from '../../Postings/ViewAllPostings/PostingDetail';
// import UserPostings from '../UserPostings';
import { getUsersSaved } from '../../../store/saved';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [postings, setPostings] = useState({});
    const [saved, setSaved] = useState({});
    const [errors, setErrors] = useState('');

    const { username } = useParams();


    useEffect(async () => {
        if (!username) return;

        const res_user = await fetch(`/api/users/${username}`);
        const res_posts = await fetch(`/api/postings/user/${username}/postings`);
        const res_saved = await fetch(`/api/saved/user/${username}/saved`);

        if (res_user.ok) {
            const user = await res_user.json();
            setUser(user);
        } else {
            setErrors("User does not exist.");
        };

        if (res_posts.ok) {
            const postings = await res_posts.json();
            setPostings(postings);
        };

        if (res_saved.ok) {
            const saved = await res_saved.json();
            setSaved(saved);
        };
    }, [username]);

    const viewUserPostingsArr = Object.values(postings);
    const viewUserPostingsReverse = viewUserPostingsArr.reverse();

    const viewSavedPostingsArr = Object.values(saved);
    const viewSavedPostingsReverse = viewSavedPostingsArr.reverse();

    if (!user) {
        return null;
    }

    return (
        <>
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
            <div>My postings:</div>
            <div className='profile-postings'>
                {viewUserPostingsReverse?.map(posting => {
                    return <PostingDetail posting={posting} key={posting.id}/>
                    // return <UserPostings posting={posting} key={posting.id}/>
                })}
            </div>
            <div>My saved postings:</div>
            <div className='profile-saved'>
                {viewSavedPostingsReverse?.map(posting => {
                    return <PostingDetail posting={posting} key={posting.id}/>
                    // return <UserPostings posting={posting} key={posting.id}/>
                })}
            </div>
        </>
    );
}

export default UserProfile;

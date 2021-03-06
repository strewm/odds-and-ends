import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostingDetail from '../../Postings/ViewAllPostings/PostingDetail';
import EditUserModal from '../EditUserModal';
import './UserProfile.css';

const UserProfile = () => {
    const [user, setUser] = useState({});
    const [postings, setPostings] = useState({});
    const [saved, setSaved] = useState({});
    const [errors, setErrors] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { username } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

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
    }, [username, showModal]);

    const viewUserPostingsArr = Object.values(postings);
    const viewUserPostingsReverse = viewUserPostingsArr.reverse();

    const viewSavedPostingsArr = Object.values(saved);
    const viewSavedPostingsReverse = viewSavedPostingsArr.reverse();

    if (!user.profile_picture) {
        return null;
    }

    let editProfile;
    if (username === sessionUser.username) {
        editProfile = <EditUserModal showModal={showModal} setShowModal={setShowModal} />
    }


    return (
        <div className='profile-container'>
            <div className='profile-container-header'>
                <div className='profile-image'
                    style={{
                        backgroundImage: `url(${user?.profile_picture})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}
                >{editProfile}</div>
                <div id='username'>@{user?.username}</div>
                <div id='email'>{user?.email}</div>
            </div>
            <div className='profile-headers'>{username}'s postings:</div>
            <div className='profile-posting-container'>
                {viewUserPostingsReverse?.map(posting => {
                    return <PostingDetail posting={posting} key={posting.id}/>
                })}
            </div>
            <div className='profile-headers'>{username}'s saved postings:</div>
            <div className='profile-posting-container'>
                {viewSavedPostingsReverse?.map(posting => {
                    return <PostingDetail posting={posting} key={posting.id}/>
                })}
            </div>
        </div>
    );
}

export default UserProfile;

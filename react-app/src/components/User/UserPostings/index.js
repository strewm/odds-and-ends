import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import { getAllPostings } from "../../../store/postings";
import PostingDetail from "../../Postings/ViewAllPostings/PostingDetail";

// import './ViewPosts.css';


const UserPostings = () => {
    // const [update, setUpdate] = useState(false);

    const dispatch = useDispatch();
    // const viewUserPostings = useSelector(state => state.postings);
    // console.log('----------POSTS?', viewUserPostings)


    useEffect(() => {
        dispatch(getAllPostings());
        // setUpdate(false);
    }, [dispatch])

    return (
        <div>hi</div>
        // <div className='all-posting-container'>
        //     {viewUserPostingsReverse.map(posting => (
        //         <PostingDetail posting={posting} key={posting.id} />
        //     ))}
        // </div>
    )
}

export default UserPostings;

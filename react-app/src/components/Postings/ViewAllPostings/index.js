import React, { useEffect, useState } from "react";
import { getAllPostings } from "../../../store/postings";
import PostingDetail from "./PostingDetail";
import { useDispatch, useSelector } from 'react-redux';
// import Footer from "../../Footer";
// import './ViewPosts.css';


const ViewPostings = () => {
    const dispatch = useDispatch();
    const viewPostings = useSelector(state => state.postings);
    // console.log('----------POSTS?', viewPostings)


    useEffect(() => {
        dispatch(getAllPostings());
    }, [dispatch])

    const viewPostingsArr = Object.values(viewPostings);
    const viewPostingsArrReverse = viewPostingsArr.reverse();

    return (
        <div className='all-posting-container'>
            {viewPostingsArrReverse.map(posting => (
                <PostingDetail posting={posting} key={posting.id} />
            ))}
        </div>
    )
}

export default ViewPostings;

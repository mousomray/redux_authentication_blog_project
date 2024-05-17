import React from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // MUI Thumb Up Icon 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { like } from '../Allreducers/likeslice';
import { useParams } from 'react-router-dom';

const Like = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const { likes, loading } = useSelector((state) => state.mylikes);

    useEffect(() => {
        dispatch(like(id));
    }, [id])

    return (
        <>
            <ThumbUpIcon onClick={() => dispatch(like(id))} style={{ cursor: 'pointer' }} /> {likes?.likes} &nbsp;&nbsp;&nbsp;
        </>
    )
}

export default Like

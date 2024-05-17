import React from 'react'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'; // MUI Thumb Down Icon 
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { unlike } from '../Allreducers/unlikeslice';
import { useParams } from 'react-router-dom';

const Like = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const { unlikes, loading } = useSelector((state) => state.myunlikes);

    useEffect(() => {
        dispatch(unlike(id));
    }, [id])

    return (
        <>
            <ThumbDownIcon onClick={() => dispatch(unlike(id))} style={{ cursor: 'pointer' }} /> {unlikes?.unlikes} &nbsp;&nbsp;&nbsp;
        </>
    )
}

export default Like

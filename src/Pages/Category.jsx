import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categorylist } from '../Allreducers/categoryslice';
import Skeleton from '@mui/material/Skeleton';

const Category = () => {

    const dispatch = useDispatch();

    const { allcategory, loading } = useSelector((state) => state.myallcategory);

    useEffect(() => {
        dispatch(categorylist());
    }, []);

    return (
        <>
            <h1>Category</h1>
            <ul>
                <Link to="/blog">
                    <li>All</li>
                </Link>
                {loading ? (
                    // Display Skeleton while loading
                    <>
                        <Skeleton variant="rectangular" width="100%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={40} />
                        <Skeleton variant="rectangular" width="100%" height={40} />
                    </>
                ) : (
                    allcategory.map((item) => (
                        <Link key={item._id} to={`/categorydetails/${item._id}`}>
                            <li>{item?.category}</li>
                        </Link>
                    ))
                )}
            </ul>
        </>
    );
};

export default Category;

import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { categorylist } from '../Allreducers/categoryslice'
import { allrecent } from '../Allreducers/recentslice';
import { search } from '../Allreducers/searchslice';
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux';

const Category = () => {


    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch Search Data
    const getSearchData = async () => {
        const response = await dispatch(search(searchQuery)); // Pass searchQuery to the search action
        return response?.payload;
    };

    // Get Product For Use Query 
    const getCategorydata = async () => {
        const response = await dispatch(categorylist())
        return response?.payload
    }

    // Get Recent Post Data For Use Query 
    const getRecentdata = async () => {
        const response = await dispatch(allrecent())
        return response?.payload
    }

    // Query for Search Data
    const { data: searchData } = useQuery({
        queryKey: ['searchData', searchQuery], // Include searchQuery in the queryKey
        queryFn: getSearchData,
        enabled: !!searchQuery, // Ensure search query is not empty before fetching data
    });

    // Use Query For Category
    const { isLoading, isError, data: categorydata, error, refetch } = useQuery({
        queryKey: ['category'],
        queryFn: getCategorydata
    })

    // Use Query For Recent Post
    const { data: recentdata } = useQuery({
        queryKey: ['recent'],
        queryFn: getRecentdata
    })

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <>
            <div class="col-lg-4">

                <div class="sidebar" data-aos="fade-left">

                    <h3 class="sidebar-title">Search</h3>
                    <div class="sidebar-item search-form">
                        <form action="" onSubmit={(e) => e.preventDefault()}>
                            <input type="text" value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search..." />
                        </form>

                        <div>
                            {Array.isArray(searchData) && searchData.length > 0 && (
                                <div className="sidebar-item recent-posts">
                                    {searchData.map((value) => (
                                        <div key={value._id} className="post-item clearfix">
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL}blog/image/${value._id}`}
                                                alt=""
                                                style={{ height: '60px', padding:'10px' }}
                                            />
                                            <div>
                                                <p>
                                                    {searchData && searchData.length === 0 && (
                                                        <p style={{ color: 'red' }}>No Results Found</p>
                                                    )}

                                                </p>
                                            </div>
                                            <h6>
                                                <Link to={`/blogdetails/${value._id}`}>{value.title}</Link>
                                            </h6>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                    {/* <!-- End sidebar search formn--> */}


                    <h3 class="sidebar-title">Categories</h3>
                    {categorydata?.map((value) => {
                        return (
                            <>
                                <div class="sidebar-item categories">
                                    <Link key={value._id} to={`/categorydetails/${value._id}`}>
                                        <ul>
                                            <li><a href="#">{value?.category}</a></li>
                                        </ul>
                                    </Link>
                                </div>

                            </>
                        )
                    })}


                    <h3 class="sidebar-title">Recent Posts</h3>
                    {recentdata?.map((value) => {
                        return (
                            <>
                                <div class="sidebar-item recent-posts">
                                    <div class="post-item clearfix">
                                        <img src={`${process.env.REACT_APP_BASE_URL}blog/image/${value._id}`} alt="" />
                                        <h4><Link to={`/blogdetails/${value._id}`}>{value?.title}</Link></h4>
                                        <time datetime="2020-01-01">{new Date(value.createdAt).toLocaleDateString('en-GB')}</time>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                    {/* <!-- End sidebar recent posts--> */}
                </div>
            </div>
        </>
    )
}

export default Category

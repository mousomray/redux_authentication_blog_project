import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

// Api Call Area
import { categorydetails } from '../Allreducers/categorydetailsslice';
import Category from './Category';
import Recentpost from './Recentpost';
import Loader2 from '../Common/Loader2';


const Categorydetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    // Get Category Details For Use Query 
    const getCategorydetailsdata = async () => {
        const response = await dispatch(categorydetails(id))
        return response?.payload
    }


    // Use Query For Category
    const { isLoading, isError, data: categorydetailsdata, error, refetch } = useQuery({
        queryKey: ['category', id],
        queryFn: getCategorydetailsdata
    })

    // Calculate total pages
    const totalPages = Math.ceil(categorydetailsdata?.length / itemsPerPage);

    // Get current page data
    const currentPageData = categorydetailsdata?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // handle For Page Change
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    if (isLoading) {
        return (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h1><Loader2/></h1>
          </div>
        )
      }

    return (
        <>
            <Layout>
                <section id="blog" class="blog mt-5">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 entries">


                                {Array.isArray(currentPageData) && currentPageData?.map((value) => {
                                    return (
                                        <>
                                            <article class="entry" data-aos="fade-up">
                                                <div class="entry-img">
                                                    <img src={`${process.env.REACT_APP_BASE_URL}blog/image/${value._id}`} alt="" class="img-fluid" />
                                                </div>
                                                <h2 class="entry-title">
                                                    {value?.title}
                                                </h2>
                                                <div class="entry-content">
                                                    <p

                                                        dangerouslySetInnerHTML={{ __html: value?.postText?.slice(0, 285) }}

                                                    />


                                                    <Link to={`/blogdetails/${value._id}`}>
                                                        <div class="read-more">
                                                            <a href="blog-single.html">Read More</a>
                                                        </div>
                                                    </Link>
                                                </div>

                                            </article>
                                        </>
                                    )
                                })}


                                {/* Pagination Indicator*/}
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handleChangePage}
                                    color='success'
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    variant="outlined"
                                    shape="rounded"
                                />

                            </div>
                            {/* <!-- End blog entries list --> */}
                            <Category />

                        </div>

                    </div>
                </section>
                {/* <!-- End Blog Section --> */}
            </Layout>
        </>
    )
}

export default Categorydetails;

import React, { useState } from 'react'
import { blogdetails } from '../Allreducers/blogdetailslice'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Category from './Category'
import Like from './Like';
import Unlike from './Unlike';
import Showcomment from './Showcomment';
import Layout from '../Common/Layout'
import Loader2 from '../Common/Loader2'

const Blogdetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const [visibleword, setVisibleword] = useState(2000);

    // Get Category Details For Use Query 
    const getBlogdetailsdata = async () => {
        const response = await dispatch(blogdetails(id))
        return response?.payload
    }

    // Use Query For Category
    const { isLoading, isError, data: blogdetailsdata, error, refetch } = useQuery({
        queryKey: ['blog'],
        queryFn: getBlogdetailsdata
    })

    // Function For Loadmore
    const handleLoadMore = () => {
        setVisibleword(prev => prev + 2000);
    };

    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <h1><Loader2 /></h1>
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

                                <article class="entry entry-single" data-aos="fade-up">

                                    <div class="entry-img">
                                        <img src={`${process.env.REACT_APP_BASE_URL}blog/image/${id}`} alt="" class="img-fluid" />
                                    </div>

                                    <h2 class="entry-title">
                                        {blogdetailsdata?.title}
                                    </h2>

                                    <div class="entry-meta">
                                        <ul>
                                            <li><Like style={{ cursor: 'pointer' }} /></li>

                                            <li><Unlike style={{ cursor: 'pointer' }} /></li>

                                            <li class="d-flex align-items-center"><i class="icofont-wall-clock"></i> <a href="blog-single.html"><time datetime="2020-01-01">{new Date(blogdetailsdata.createdAt).toLocaleDateString('en-GB')}</time></a></li>

                                            <li><Showcomment style={{ cursor: 'pointer' }} /></li>
                                        </ul>
                                    </div>

                                    <div class="entry-content">
                                        <p

                                            dangerouslySetInnerHTML={{ __html: blogdetailsdata?.postText?.slice(0, visibleword) }}

                                        />

                                        {visibleword < blogdetailsdata?.postText?.length ? (
                                            <div className="text-center mt-3 mb-3 mx-auto">
                                                <button className="btn btn-success" onClick={handleLoadMore}>Load More</button>
                                            </div>
                                        ) : null}

                                    </div>

                                </article>
                                {/* <!-- End blog entry --> */}


                                {/* <!-- End blog comments --> */}

                            </div>
                            {/* <!-- End blog entries list --> */}

                            <Category />
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}

export default Blogdetails

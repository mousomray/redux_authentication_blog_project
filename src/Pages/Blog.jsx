import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Layout from '../Common/Layout'
import { useQuery } from '@tanstack/react-query'
import { allblog } from '../Allreducers/blogslice'
import { useDispatch } from 'react-redux'
import Category from './Category';
import { Pagination } from '@mui/material';
import Loader2 from '../Common/Loader2';

const Blog = () => {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // Get Product For Use Query 
  const getBlogdata = async () => {
    const response = await dispatch(allblog()) // Call Blog function
    return response?.payload
  }

  // Use Query For Department
  const { isLoading, isError, data: blogdata, error, refetch } = useQuery({
    queryKey: ['blog'],
    queryFn: getBlogdata // This line of code work as same as useEffect()
  })

  // Calculate total pages
  const totalPages = Math.ceil(blogdata?.length / itemsPerPage);

  // Get current page data
  const currentPageData = Array.isArray(blogdata) && blogdata?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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

export default Blog

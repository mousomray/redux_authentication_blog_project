import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Api function area
import { banner } from '../Allreducers/bannerslice'
import { service } from '../Allreducers/serviceslice'
import { team } from '../Allreducers/teamslice'
import { testimonial } from '../Allreducers/testimonialslice'
import Loader2 from '../Common/Loader2'

const Home = () => {

  const dispatch = useDispatch();

  // Get Banner data Function 
  const getBannerdata = async () => {
    const response = await dispatch(banner())
    return response?.payload
  }

  // Get Service data Function 
  const getServicedata = async () => {
    const response = await dispatch(service())
    return response?.payload
  }

  // Get Banner data Function 
  const getTeamdata = async () => {
    const response = await dispatch(team())
    return response?.payload
  }

  // Get Banner data Function 
  const getTestimonialdata = async () => {
    const response = await dispatch(testimonial())
    return response?.payload
  }

  // Use Query For Banner
  const { isLoading, isError, data: bannerdata, error, refetch } = useQuery({
    queryKey: ['banner'],
    queryFn: getBannerdata
  })

  // Use Query For Service
  const { data: servicedata } = useQuery({
    queryKey: ['service'],
    queryFn: getServicedata
  })

  // Use Query For Team
  const { data: teamdata } = useQuery({
    queryKey: ['team'],
    queryFn: getTeamdata
  })

  // Use Query For Testimonial
  const { data: testimonialdata } = useQuery({
    queryKey: ['tetimonial'],
    queryFn: getTestimonialdata
  })

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
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

        {/* Banner area start*/}
        <Carousel style={{ width: '100%', height: '500px', marginTop: '45px' }}>
          {bannerdata?.map((value) => (
            <div
              key={value?._id}
              style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                overflow: 'hidden',
              }}
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL}/banner/photo/${value?._id}`}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '0', /* Align content at the bottom */
                  left: '0',
                  right: '0', /* Stretch content across the entire width */
                  padding: '20px', /* Add some padding for better readability */
                  background: 'rgba(0, 0, 0, 0.5)', /* Semi-transparent dark overlay */
                  color: 'white',
                  display: 'flex', /* Use flexbox for better alignment */
                  flexDirection: 'column', /* Stack content vertically */
                  justifyContent: 'center', /* Center content vertically */
                  alignItems: 'center', /* Center content horizontally */
                }}
              >
                <h1
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 5rem)',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: 'inherit', /* Inherit color from parent */
                  }}
                >
                  {value?.title}
                </h1>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 3vw, 2rem)',
                    color: 'inherit', /* Inherit color from parent */
                  }}
                >
                  {value?.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>

        {/*Banner Area End*/}

        {/* // <!-- ======= Services Section ======= --> */}
        <section id="services" className="services section-bg" style={{ padding: '60px 0' }}>
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2><strong>Services</strong></h2>
            </div>
            <div class="row">

              {servicedata?.map((item) => (
                <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 mb-5" data-aos="zoom-in" data-aos-delay="200" key={item._id}>
                  <div class="icon-box iconbox-orange" style={{
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#fff',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', /* Subtle shadow for depth */
                  }}>
                    <i class="fas fa-lightbulb" style={{ fontSize: '30px', color: '#f9a107', marginBottom: '10px' }}></i> <h4 style={{ fontSize: '22px' }}><a href="#" style={{ color: '#343a40', textDecoration: 'none' }}>{item?.name}</a></h4>
                    <p style={{ color: '#6c757d' }}>{item?.details}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* // <!-- End Services Section --> */}

        {/* Team Start */}
        <section id="services" className="services section-bg" style={{ padding: '60px 0' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2><strong>Team</strong></h2>
            </div>
            <div className="row">
              {teamdata?.map((item) => (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 mb-5" data-aos="zoom-in" data-aos-delay="200" key={item._id}>
                  <div className="icon-box iconbox-orange" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fff', transition: 'all 0.3s ease' }}>
                    <img src={`${process.env.REACT_APP_BASE_URL}team/photo/${item._id}`} style={{ height: '200px' }} alt="" />
                    <h4 style={{ fontSize: '22px' }}><a href="#" style={{ color: '#343a40', textDecoration: 'none' }}>{item?.name}</a></h4>
                    <p style={{ color: '#6c757d' }}>{item?.possession}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Team End */}

        {/*Testimonials Start*/}

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="slider-container">
                <h1 className='mb-5' style={{ textAlign: 'center' }}>Testimonial</h1>
                <Slider {...settings} autoPlay={true} interval={5000}>
                  {testimonialdata?.map((testi, index) => {
                    return (
                      <div key={index} className="testimonial-card">
                        <img src={`${process.env.REACT_APP_BASE_URL}testimonials/photo/${testi._id}`} alt="testimonial" className="testimonial-image" style={{ height: '100px', borderRadius: '50%', margin: '0 auto' }} />
                        <div className="testimonial-content text-center">
                          <h3 className="client-name mt-3">{testi?.name}</h3>
                          <p className="review">{testi?.talk}</p>
                        </div>
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>

        {/*Testimonials End*/}

      </Layout >
    </>
  )
}

// Custom Next Arrow For Testimonial 
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

// Custom Next Arrow For Testimonial 
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "blue" }}
      onClick={onClick}
    />
  );
}

export default Home











import React from 'react'
import { useEffect } from 'react'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// Import Api function area
import { banner } from '../Allreducers/bannerslice'
import { service } from '../Allreducers/serviceslice'
import { team } from '../Allreducers/teamslice'
import { testimonial } from '../Allreducers/testimonialslice'

const Home = () => {

  const dispatch = useDispatch();


  const { bannerdata, loading } = useSelector((state) => state.mybanner);
  const { servicedata } = useSelector((state) => state.myservice);
  const { teamdata } = useSelector((state) => state.myteam);
  const { testimonialdata } = useSelector((state) => state.mytestimonial);

  useEffect(() => {
    dispatch(banner());
    dispatch(service());
    dispatch(team());
    dispatch(testimonial());
  }, []);

  return (
    <>
      <Layout>

        {/* Banner area start*/}
        <Carousel style={{ width: '100%', height: '500px', marginTop:'45px' }}>
          {bannerdata?.map((value) => (
            <div key={value?._id} style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}>
              <img
                src={`${process.env.REACT_APP_BASE_URL}/banner/photo/${value?._id}`}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block',marginTop:'45px' }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', width: '80%' }}>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 5rem)', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {value?.title}
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}>
                  {value?.description}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        {/*Banner Area End*/}

        {/* // <!-- ======= Services Section ======= --> */}
        <section id="services" className="services section-bg" style={{ padding: '60px 0' }}>
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2><strong>Services</strong></h2>
            </div>
            <div className="row">
              {servicedata?.map((item) => (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 mb-5" data-aos="zoom-in" data-aos-delay="200" key={item._id}>
                  <div className="icon-box iconbox-orange" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', backgroundColor: '#fff', transition: 'all 0.3s ease' }}>
                    <h4 style={{ fontSize: '22px' }}><a href="#" style={{ color: '#343a40', textDecoration: 'none' }}>{item?.name}</a></h4>
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
        
        <div className="testimonial-slider-container" style={{ textAlign: 'center' }}>
          <div className="section-title">
            <h2><strong>Testimonials</strong></h2>
          </div>
          <div className="testimonial-slider" style={{ display: 'flex', justifyContent: 'center' }}>
            <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
              {testimonialdata?.map((item) => (
                <React.Fragment key={item._id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={item.name} src={`${process.env.REACT_APP_BASE_URL}testimonials/photo/${item._id}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.position}
                          </Typography>
                          <br />
                          {item.talk}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </div>
        </div>
        {/*Testimonials End*/}






      </Layout >
    </>
  )
}

export default Home











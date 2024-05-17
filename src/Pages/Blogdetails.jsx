import React from 'react';
import Layout from '../Common/Layout';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import DetailsIcon from '@mui/icons-material/Details';
import Skeleton from '@mui/material/Skeleton';

// Import For Card 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Import API Area
import Category from './Category';
import Recentpost from './Recentpost';
import { Link } from 'react-router-dom';
import { blogdetails } from '../Allreducers/blogdetailslice';
import Like from './Like';
import Unlike from './Unlike';
import Showcomment from './Showcomment';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Blogdetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { bdetails, loading } = useSelector((state) => state.myblogdetails);

    useEffect(() => {
        dispatch(blogdetails(id))
    }, [id])

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <Layout>

                <div className='container' style={{ marginTop: '100px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>

                                {/* Card Area Start*/}
                                <Card sx={{ maxWidth: 850 }}>
                                    <CardHeader
                                        avatar={
                                            loading ? (
                                                <Skeleton variant="circular" width={40} height={40} />
                                            ) : (
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    W
                                                </Avatar>
                                            )
                                        }
                                        action={
                                            loading ? (
                                                <Skeleton variant="rectangular" width={40} height={40} />
                                            ) : (
                                                <IconButton aria-label="settings">
                                                    <MoreVertIcon />
                                                </IconButton>
                                            )
                                        }
                                        title={loading ? <Skeleton variant="text" width={120} /> : "Webskitter"}
                                        subheader={loading ? <Skeleton variant="text" width={150} /> : new Date(bdetails.createdAt).toLocaleDateString('en-GB')}
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={loading ? "" : `${process.env.REACT_APP_BASE_URL}blog/image/${id}`}
                                        alt="Paella dish"
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="text.secondary" fontWeight={'bold'} fontSize={'30px'}>
                                            {loading ? <Skeleton variant="text" width={200} /> : bdetails?.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing>
                                        {loading ? (
                                            <Skeleton variant="circular" width={24} height={24} />
                                        ) : (
                                            <>
                                                <Like style={{ cursor: 'pointer' }} />
                                                <Unlike style={{ cursor: 'pointer' }} />
                                                <Showcomment style={{ cursor: 'pointer' }} />
                                                <ExpandMore
                                                    expand={expanded}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            </>
                                        )}
                                    </CardActions>
                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <Typography paragraph>Blog Details:</Typography>
                                            {loading ? (
                                                <Skeleton variant="text" />
                                            ) : (
                                                <Typography paragraph
                                                    dangerouslySetInnerHTML={{ __html: bdetails?.postText }}
                                                />
                                            )}
                                        </CardContent>
                                    </Collapse>
                                </Card>
                                {/*Card Area End*/}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '15px', boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)' }}>

                                    <Category />

                                    <hr />

                                    <Recentpost />

                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div>

            </Layout>
        </>
    )
}

export default Blogdetails;

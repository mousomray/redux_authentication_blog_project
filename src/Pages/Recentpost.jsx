import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

// API call area
import { useSelector, useDispatch } from 'react-redux';
import { allrecent } from '../Allreducers/recentslice';

const Recentpost = () => {
    const dispatch = useDispatch();
    const { allrecentdata, loading } = useSelector((state) => state.myrecentpost);

    useEffect(() => {
        dispatch(allrecent());
    }, []);

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>Recent Posts</Typography>

                {loading ? (
                    // Display Skeleton while loading
                    <Skeleton variant="rectangular" width="100%" height={150} animation="wave" />
                ) : (
                    allrecentdata?.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start" disablePadding>
                                <ListItemAvatar>
                                    <Avatar alt={item.title} src={`${process.env.REACT_APP_BASE_URL}blog/image/${item._id}`} sx={{ width: 80, height: 80, marginLeft: '10px' }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Link to={`/blogdetails/${item._id}`}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    }
                                    secondary={
                                        <Typography variant="body2" color="text.secondary">
                                            Create at: {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                        </Typography>
                                    }
                                    sx={{ ml: 2, mr: 2 }}
                                />
                            </ListItem>
                            {index !== allrecentdata.length - 1 && <Divider variant="inset" component="li" />}
                        </React.Fragment>
                    ))
                )}
            </List>
        </>
    );
};

export default Recentpost;

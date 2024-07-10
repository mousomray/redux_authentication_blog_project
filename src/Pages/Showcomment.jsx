import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CommentIcon from '@mui/icons-material/Comment'; // For Comment Icon
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { comment } from '../Allreducers/showcommentslice';
import { addcomment } from '../Allreducers/addcommentslice'
import { useParams } from 'react-router-dom';
import Loader from '../Common/Loader';

const Showcomment = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { comments, loading } = useSelector((state) => state.mycomments);

    const [showComments, setShowComments] = useState(false); // For controlling comment visibility
    const [loadmore, setLoadmore] = useState(3); // For Loadmore 
    const [addcommentss, setComment] = useState({ // State for the comment form
        name: '',
        email: '',
        comment: ''
    });

    useEffect(() => {
        dispatch(comment(id));
    }, [id]);

    const handleCommentIconClick = () => {
        // Toggle the visibility of comments
        setShowComments(!showComments);
    };

    const handleLoadmore = () => {
        // Increase the number of comments to load
        setLoadmore(prev => prev + 4);
    };

    const defaultTheme = createTheme();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setComment({ ...addcommentss, [name]: value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        await dispatch(addcomment({ id, addcommentss }));
        setComment({ // Reset the comment form after submitting
            name: '',
            email: '',
            comment: ''
        });
        // Update the comments state after adding a new comment
        await dispatch(comment(id));
    }

    return (
        <Container maxWidth="md">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CommentIcon onClick={handleCommentIconClick} style={{ cursor: 'pointer' }} />
                <span style={{ marginLeft: '5px' }}>{comments.length} Comments</span>
            </div>

            {/* All comments */}
            {showComments && (
                <List sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: '0px 2px 4px black' }}>
                    {comments.slice(0, comments.length).reverse().slice(0, loadmore).map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItem alignItems="flex-start" style={{ marginBottom: '10px' }}>
                                <ListItemText
                                    secondary={
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Name: {item?.name} <br />
                                            Email: {item?.email}<br />
                                            Comment: {item?.comment}<br />
                                            Created date : {new Date(item.createdAt).toLocaleDateString('en-GB')}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                    {loadmore < comments.length && (
                        <div className="text-center mt-3">
                            <Link><p onClick={handleLoadmore} style={{ height: '20px', fontSize: '16px', cursor: 'pointer', justifyContent: 'center' }}>See More</p></Link>
                        </div>
                    )}

                    {/* Create Comment Area */}
                    <ThemeProvider theme={defaultTheme}>
                        <CssBaseline />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <CommentIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" style={{ marginTop: '5px' }}>
                                Post Comment
                            </Typography>
                            <form onSubmit={handleOnSubmit} style={{ width: '100%', marginTop: '20px', padding: '20px' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="name"
                                            label="Name"
                                            name="name"
                                            autoComplete="name"
                                            value={addcommentss.name}
                                            onChange={handleOnChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            value={addcommentss.email}
                                            onChange={handleOnChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="comment"
                                            label="Comment"
                                            type="text"
                                            id=""
                                            autoComplete="new-password"
                                            value={addcommentss.comment}
                                            onChange={handleOnChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <Loader /> : 'Post'}
                                </Button>
                            </form>
                        </Box>
                    </ThemeProvider>
                    {/* End Create Comment Area */}
                </List>
            )}
            {/* End all comments */}
        </Container>
    )
}

export default Showcomment;

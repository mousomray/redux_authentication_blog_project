import React, { useState, useEffect } from 'react';
import Layout from '../Common/Layout';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../Auth/authslice';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Avatar, Grid, CssBaseline, TextField, Button, Box, FormControlLabel, Checkbox, Paper } from '@mui/material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Loader from '../Common/Loader';

const initialValue = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    photo: ''
};

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { redirectReg, loading } = useSelector((state) => state?.Auth);
    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState({});
    const [image, setImage] = useState(null);

    const validation = () => {
        let error = {};

        if (!user.name) {
            error.name = 'Name is Required';
        }

        if (!user.email) {
            error.email = 'Email is Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            error.email = 'Invalid Email';
        }

        if (!user.mobile) {
            error.mobile = 'Mobile is Required';
        }

        if (!user.password) {
            error.password = 'Password is Required';
        }

        return error;
    };

    const postUserData = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

        if (!value) {
            setError({ ...error, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is Required` });
        } else {
            setError({ ...error, [name]: '' });
        }
    };

    const SubmitInfo = (e) => {
        e.preventDefault();
        const ErrorList = validation();
       
        if (Object.keys(ErrorList).length === 0) {
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('email', user.email);
            formData.append('mobile', user.mobile);
            formData.append('password', user.password);
            formData.append('photo', image);
            dispatch(registerUser(formData));
        }
    };

    
    // For Redirect which is part of Authentication (Start) 
    const redirectUser = () => {
        const name = localStorage.getItem('name');
        const isInLoginPage = window.location.pathname.toLowerCase() === '/register';
        if (name !== null && name !== undefined && name !== '') {
            isInLoginPage && navigate('/login');
        }
    };

    useEffect(() => {
        redirectUser();
    }, [redirectReg]);
    // For Redirect which is part of Authentication (End) 

    return (
        <Layout>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', margin: 'auto' }}>
                        <AppRegistrationIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
                        Register
                    </Typography>
                    <Box component="form" onSubmit={SubmitInfo} sx={{ mt: 2 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            value={user.name}
                            onChange={postUserData}
                            error={!!error.name}
                            helperText={error.name}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={user.email}
                            onChange={postUserData}
                            error={!!error.email}
                            helperText={error.email}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="mobile"
                            label="Mobile"
                            name="mobile"
                            value={user.mobile}
                            onChange={postUserData}
                            error={!!error.mobile}
                            helperText={error.mobile}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={user.password}
                            onChange={postUserData}
                            error={!!error.password}
                            helperText={error.password}
                        />
                        {/*This form section is for the submit image*/}
                        <div style={{ marginBottom: '20px' }}>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />

                            {image !== "" && image !== undefined && image !== null ? (
                                <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                            ) : (
                                <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                            )}
                        </div>
                        {/*Image area end*/}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            {loading? <Loader/> : 'Register'}
                        </Button>
                    </Box>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Layout>
    );
};

export default Register;

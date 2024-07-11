import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../Common/Layout';
import { update } from './updateslice';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoginIcon from '@mui/icons-material/Login';
import { CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form'; // Import useForm hook 
import { useMutation } from '@tanstack/react-query';
import Loader from '../Common/Loader';



const Update = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm(); // Define in State

    // Function For Mutation
    const myupdate = async (data) => {

        const myupdatedata = {
            user_id: data.user_id,
            password: data.password
        }

        const response = await dispatch(update(myupdatedata))
        console.log("My Update response is ", response);
        if (response && response?.payload?.success === true) {
            reset();
            navigate('/dashboard');
            setLoading(false);
        } else {
            navigate('/update');
            setLoading(false);
        }
        return response.data;
    };


    // Start Mutation Area
    const mutation = useMutation({
        mutationFn: (data) => myupdate(data),
    });


    // Handle On Submit Area
    const onSubmit = (data) => {
        mutation.mutate(data);
        setLoading(true);
    };

    return (
        <Layout>
            <Container component="main" maxWidth="xs" style={{ marginTop: '150px' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 15,
                        marginBottom: 8,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.12)'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Password
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>


                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="user_id"
                                    label="User ID"
                                    {...register("user_id", {
                                        required: "This field is required",
                                    })}
                                />
                                {errors.user_id && <p style={{ color: 'red' }}>{errors.user_id.message}</p>}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    type="password"
                                    id="password"
                                    label="Password"
                                    {...register("password", {
                                        required: "This field is Required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be 8 characters"
                                        }
                                    })}
                                />
                                {errors?.password && (
                                    <p style={{ color: 'red' }}>{errors.password.message}</p>
                                )}
                            </Grid>



                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <Loader /> : "Update"}

                        </Button>

                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};

export default Update;
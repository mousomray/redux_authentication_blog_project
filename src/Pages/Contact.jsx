import React, { useEffect, useState } from 'react';
import Layout from '../Common/Layout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ContactsIcon from '@mui/icons-material/Contacts';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { addcontact } from '../Allreducers/contactslice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Common/Loader';



const initialstate = {
    name: '',
    email: '',
    phone: '',
    message: ''
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

const Contact = () => {
    const [contact, setContact] = useState(initialstate);
    const { loading } = useSelector((state) => state.mycontact);
    const dispatch = useDispatch();


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        dispatch(addcontact(contact))
        setContact(initialstate);
    };

    return (
        <Layout>
            <ThemeProvider theme={defaultTheme}>
                <Grid container component="main" sx={{ height: '100vh', marginTop: '45px' }} onSubmit={handleOnSubmit}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <ContactsIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Contact
                            </Typography>
                            <Box component="form" noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    onChange={handleOnChange}
                                    value={contact.name}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={handleOnChange}
                                    value={contact.email}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    autoFocus
                                    onChange={handleOnChange}
                                    value={contact.phone}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="message"
                                    label="Message"
                                    type="message"
                                    id="message"
                                    autoComplete="message"
                                    onChange={handleOnChange}
                                    value={contact.message}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {loading ? <Loader /> : 'Submit'}
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </Layout>
    );
}

export default Contact;

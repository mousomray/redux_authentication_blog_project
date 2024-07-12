import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import CreateIcon from '@mui/icons-material/Create';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../Common/Layout"; // Import Layout 
import { useForm } from "react-hook-form"; // Import React Hook Form 
import { useQuery } from "@tanstack/react-query";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom"; // Import Use Navigate
import { useState } from "react"; // Import Use State
import { useDispatch } from "react-redux"; // Import Use Dispatch
import { editstudent, detailstudent } from "./crudslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
import Loader from "../Common/Loader";
const defaultTheme = createTheme();

const Editstudent = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const [loading, setLoading] = useState(false) // For Loading

    // Get product For Single Value (Start)
    const getStudent = async () => {
        try {
            const response = await dispatch(detailstudent(id));

            const reg = {

                name: response?.payload?.name,
                email: response?.payload?.email,
                phone: response?.payload?.phone,
                address: response?.payload?.address,
                city: response?.payload?.city,
                class: response?.payload?.class,
            };

            reset(reg)

        } catch (error) {
            console.log(error);
        }
    };

    useQuery({ queryFn: getStudent }) // This line of code work as same as useEffect()
    // Get product For Single Value (End)


    // Handle form submission
    const onSubmit = async (data) => {
        setLoading(true);
        const reg = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            class: data.class
        };
        try {
            const response = await dispatch(editstudent({ data: reg, id }))
            console.log("Resss", response);
            if (response && response?.type === 'editstudent/fulfilled') {
                navigate('/showstudent')
                setLoading(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    }

    return (
        <Layout>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
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
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <CreateIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit student
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit(onSubmit)}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="text"
                                        id="name"
                                        label="Name"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("name", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Name must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.name && (
                                        <p style={{ color: 'red' }}>{errors.name.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="email"
                                        id="email"
                                        label="Email"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("email", {
                                            required: "This field is required",
                                            pattern: {
                                                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                message: "Email Pattern should be xyz@gmail.com",
                                            },
                                        })}
                                    />
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="phone"
                                        label="phone"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("phone", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 10,
                                                message: "Phone number must be 10 characters"
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: "Phone number must be 10 characters"
                                            }
                                        })}
                                    />
                                    {errors?.phone && (
                                        <p style={{ color: 'red' }}>{errors.phone.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="text"
                                        id="address"
                                        label="Address"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("address", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Name must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.address && (
                                        <p style={{ color: 'red' }}>{errors.address.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="text"
                                        id="city"
                                        label="City"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("city", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "City must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.city && (
                                        <p style={{ color: 'red' }}>{errors.city.message}</p>
                                    )}
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="text"
                                        id="class"
                                        label="Class"
                                        InputLabelProps={{
                                            shrink: true,
                                            style: { fontSize: '1rem' } // Adjust the font size as needed
                                        }}
                                        {...register("class", {
                                            required: "This field is Required",
                                            minLength: {
                                                value: 3,
                                                message: "Class must be atleast 3 characters"
                                            }
                                        })}
                                    />
                                    {errors?.class && (
                                        <p style={{ color: 'red' }}>{errors.class.message}</p>
                                    )}
                                </Grid>


                            </Grid>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {loading ? <Loader /> : "Edit"}
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Layout >
    );
};

export default Editstudent;
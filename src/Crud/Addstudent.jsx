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
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom"; // Import Use Navigate
import { useState } from "react"; // Import Use State
import { useDispatch } from "react-redux"; // Import Use Dispatch
import { addstudent } from "./crudslice"; // Import registerUser Function
import { CircularProgress } from "@mui/material"; // Circle Loader 
import Loader from "../Common/Loader";
const defaultTheme = createTheme();

const Addstudent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // React Hook Form Area
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();


    const [loading, setLoading] = useState(false) // For Loading


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
            const response = await dispatch(addstudent(reg))
            console.log("Resss", response);
            if (response && response?.payload?.success === true) {
                reset()
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
                    <Paper
                        elevation={5}
                        style={{
                            padding: "1rem 3rem",
                            marginTop: "200px",
                            width: "35rem",
                            position: "relative",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -10%)",
                        }}
                    >
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <CreateIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Add student
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
                                    {loading ? <Loader /> : "Add"}
                                </Button>
                            </Box>
                        </Box>

                    </Paper>
                </Container>
            </ThemeProvider>
        </Layout>
    );
};

export default Addstudent;
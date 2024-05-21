import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
    loading: false,
    user: {}, // for user object
    redirectTo: null, // For Redirect Page 
    Logouttoggle: false, // For Logout Button 
    userName: false,
    redirectReg: null // For to Redirect Login
}

// API fetch for Register
export const registerUser = createAsyncThunk("/signup", async (user) => {
    try {
        const apiurl = "register"
        const response = await axiosInstance.post(apiurl, user);
        if (response && response?.data?.success === true) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        console.log(error);
    }
});

// API fetch for Login
export const loginRequest = createAsyncThunk("login", async (user) => {
    try {
        const apiurl = "login"
        const response = await axiosInstance.post(apiurl, user);
        if (response && response?.data?.status === 200) {
            toast.success(response?.data?.message)
        } else {
            toast.error(response?.data?.message)
        }
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
    }
});



export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        //check for auth token 
        check_token: (state, { payload }) => {
            let token = localStorage.getItem("token");
            if (token !== null && token !== undefined) {
                state.Logouttoggle = true;
            }
        },

        logout: (state, { payload }) => {
            localStorage.removeItem("token");
            localStorage.removeItem("name");
            toast.success("Logout successfully")
            state.Logouttoggle = false

        },


        // For to go Register page after keeping token in local storage 
        RegLog: (state, { payload }) => {
            localStorage.removeItem("name");
            state.Logouttoggle = false

        },

        
        // Redirect after login
        redirectToo: (state, { payload }) => {
            state.redirectTo = payload
        },

       // Redirect Register page
        redirectTo_Register: (state, { payload }) => {
            state.redirectReg = payload
        }


    },

    extraReducers: (builder) => {
        
        // Register Request
        builder

            //For Registration Pending
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //For Registration Fulfilled
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload && payload.success === true) { // Check if payload exists
                    localStorage.setItem("name", payload.data.name); // I use .data because data is present in API
                    state.redirectReg = "/login"; // Redirect Login If Get Name in storage
                    // toast.success(`Hi ${payload?.data?.name}, ${payload?.message}`);
                }
            })

            //For Registration Reject
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });


        // Login Request
        builder
            .addCase(loginRequest.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(loginRequest.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.status === 200) {
                    localStorage.setItem("token", payload?.token);
                    localStorage.setItem("name", payload?.user.name); // Here I use .user beacuse in this API user is present not data
                    state.Logouttoggle = true;
                    state.redirectTo = "/blog"; // Redirect Blog After storing data in Local storage
                    // toast.success(`Hi ${payload?.user.name}, ${payload?.message}`);
                }
            })
            .addCase(loginRequest.rejected, (state, action) => {
                state.loading = false;
            });
    }

})

export const {
    check_token, redirectToo, logout, redirectTo_Register, RegLog } = AuthSlice.actions


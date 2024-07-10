import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";

// Call Api for blog Slider
export const blogdetails = createAsyncThunk("blogdetails", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.blogdetails}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching blog Details data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching blog Details data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const blogstoredetails = createSlice({
    name: "blogdetails",
    initialState: {
        bdetails: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(blogdetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(blogdetails.fulfilled, (state, action) => {
                state.loading = false;
                state.bdetails = action.payload;
            })
            .addCase(blogdetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default blogstoredetails.reducer;
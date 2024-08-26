import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
// import { endpoints } from "../endpoint/endpoint";
import { myendpoints } from "../endpoint/endpoint";

// Call Api for testimonial Slider
export const testimonial = createAsyncThunk("testimonial", async (_, { rejectWithValue }) => {
    try {
        // const apiurl = endpoints.cms.testimonial
        const apiurl = myendpoints[3]
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching testimonial data", response);
        return response?.data?.testimonials
    } catch (error) {
        console.log("Error Fetching testimonial data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const testimonialdetails = createSlice({
    name: "testimonialdetails",
    initialState: {
        testimonialdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(testimonial.pending, (state) => {
                state.loading = true;
            })
            .addCase(testimonial.fulfilled, (state, action) => {
                state.loading = false;
                state.testimonialdata = action.payload;
            })
            .addCase(testimonial.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default testimonialdetails.reducer;
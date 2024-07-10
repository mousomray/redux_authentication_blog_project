import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";

// Call Api for Banner Slider
export const service = createAsyncThunk("service", async (_, { rejectWithValue }) => {
    try {
        const apiurl = endpoints.cms.service
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Service data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Service data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const servicedetails = createSlice({
    name: "servicedetails",
    initialState: {
        servicedata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(service.pending, (state) => {
                state.loading = true;
            })
            .addCase(service.fulfilled, (state, action) => {
                state.loading = false;
                state.servicedata = action.payload;
            })
            .addCase(service.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default servicedetails.reducer;
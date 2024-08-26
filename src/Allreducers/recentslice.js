import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
// import { endpoints } from "../endpoint/endpoint";
import { myendpoints } from "../endpoint/endpoint";

// Call Api for recent Slider
export const allrecent = createAsyncThunk("allrecent", async (_, { rejectWithValue }) => {
    try {
        // const apiurl = endpoints.cms.recentpost
        const apiurl = myendpoints[7]
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching recent data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching recent data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const allrecents = createSlice({
    name: "allrecent",
    initialState: {
        allrecentdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(allrecent.pending, (state) => {
                state.loading = true;
            })
            .addCase(allrecent.fulfilled, (state, action) => {
                state.loading = false;
                state.allrecentdata = action.payload;
            })
            .addCase(allrecent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default allrecents.reducer;
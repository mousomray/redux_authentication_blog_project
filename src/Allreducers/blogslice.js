import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for blog Slider
export const allblog = createAsyncThunk("allblog", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'allBlog'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching blog data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching blog data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const allblogs = createSlice({
    name: "allblog",
    initialState: {
        allblogdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(allblog.pending, (state) => {
                state.loading = true;
            })
            .addCase(allblog.fulfilled, (state, action) => {
                state.loading = false;
                state.allblogdata = action.payload;
            })
            .addCase(allblog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default allblogs.reducer;
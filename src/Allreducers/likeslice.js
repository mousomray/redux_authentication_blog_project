import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";

// Call Api for blog Slider
export const like = createAsyncThunk("like", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.like}/${id}`
        const response = await axiosInstance.put(apiurl, {});
        console.log("Fetching Like data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Like data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const alllikes = createSlice({
    name: "like",
    initialState: {
        likes: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(like.pending, (state) => {
                state.loading = true;
            })
            .addCase(like.fulfilled, (state, action) => {
                state.loading = false;
                state.likes = action.payload;
            })
            .addCase(like.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default alllikes.reducer;
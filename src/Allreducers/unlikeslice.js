import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
// import { endpoints } from "../endpoint/endpoint";
import { myendpoints } from "../endpoint/endpoint";

// Call Api for blog Slider
export const unlike = createAsyncThunk("unlike", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${myendpoints[10]}/${id}`
        const response = await axiosInstance.put(apiurl, {});
        console.log("Fetching unlike data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching unlike data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const allunlikes = createSlice({
    name: "unlike",
    initialState: {
        unlikes: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(unlike.pending, (state) => {
                state.loading = true;
            })
            .addCase(unlike.fulfilled, (state, action) => {
                state.loading = false;
                state.unlikes = action.payload;
            })
            .addCase(unlike.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default allunlikes.reducer;
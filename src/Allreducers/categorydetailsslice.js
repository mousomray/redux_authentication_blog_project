import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for blog Slider
export const categorydetails = createAsyncThunk("categorydetails", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `category/post/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Category Details data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Category Details data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const categoriesdetails = createSlice({
    name: "categorydetails",
    initialState: {
        catdetails: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(categorydetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(categorydetails.fulfilled, (state, action) => {
                state.loading = false;
                state.catdetails = action.payload;
            })
            .addCase(categorydetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default categoriesdetails.reducer;
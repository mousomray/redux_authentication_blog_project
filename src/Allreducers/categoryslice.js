import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for blog Slider
export const categorylist = createAsyncThunk("categorylist", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'showallcategory'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Category List data", response);
        return response?.data?.data
    } catch (error) {
        console.log("Error Fetching Category List data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const categories = createSlice({
    name: "categorylist",
    initialState: {
        allcategory: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(categorylist.pending, (state) => {
                state.loading = true;
            })
            .addCase(categorylist.fulfilled, (state, action) => {
                state.loading = false;
                state.allcategory = action.payload;
            })
            .addCase(categorylist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default categories.reducer;
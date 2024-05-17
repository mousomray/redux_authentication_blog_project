import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"

// Call Api for course Slider
export const allcourse = createAsyncThunk("allcourse", async (_, { rejectWithValue }) => {
    try {
        const apiurl = 'course'
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching course data", response);
        return response?.data?.Courses
    } catch (error) {
        console.log("Error Fetching course data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const allcourses = createSlice({
    name: "allcourse",
    initialState: {
        allcoursedata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(allcourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(allcourse.fulfilled, (state, action) => {
                state.loading = false;
                state.allcoursedata = action.payload;
            })
            .addCase(allcourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default allcourses.reducer;
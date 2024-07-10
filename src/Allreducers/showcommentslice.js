import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";

// Call Api for blog Slider
export const comment = createAsyncThunk("comment", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.commentlist}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching comment data", response);
        return response?.data?.post?.comment?.comments
    } catch (error) {
        console.log("Error Fetching comment data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const allcomments = createSlice({
    name: "comment",
    initialState: {
        comments: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(comment.pending, (state) => {
                state.loading = true;
            })
            .addCase(comment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(comment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default allcomments.reducer;
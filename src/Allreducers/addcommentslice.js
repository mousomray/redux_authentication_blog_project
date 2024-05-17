import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for Add comment
export const addcomment = createAsyncThunk("addcomment", async ({ id, addcommentss }) => {
    
    console.log(id, addcommentss);
    
    try {
        const apiurl = `blog/${id}/comment/create`
        const response = await axiosInstance.post(apiurl, addcommentss);
        console.log("Fetching Add Comment data", response);
        toast.success(response?.data?.message)
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching Add Comment data", error);
        toast.error(error?.response?.data?.message)
    }
});

// createSlice area start
const addcommentslice = createSlice({
    name: "addcomment",
    initialState: {
        addcomments: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder
            // Create User
            .addCase(addcomment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addcomment.fulfilled, (state, action) => {
                state.loading = false;
                state.addcomments.push(action.payload);
            })
            .addCase(addcomment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default addcommentslice.reducer;






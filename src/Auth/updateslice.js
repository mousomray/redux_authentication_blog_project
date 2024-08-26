import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
import { toast } from "react-toastify";
import { myendpoints } from "../endpoint/endpoint";

// Call Api for Update Password
export const update = createAsyncThunk("update", async (data, { rejectWithValue }) => {
    try {
        const apiurl = myendpoints[16]
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching update Password data", response);
        toast.success(response?.data?.msg)
        return response.data;
    } catch (error) {
        console.log("Error update Password data", error);
        toast.error("Password is Not Updated")
        return rejectWithValue(error.response.data);
    }
});
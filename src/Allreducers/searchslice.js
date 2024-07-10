import { createAsyncThunk } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { endpoints } from "../endpoint/endpoint";

// Fetch Search 
export const search = createAsyncThunk("search", async (query, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.cms.search}/${query}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Search Data", response);
        return response?.data
    } catch (error) {
        console.log("Error Fetching Search Data", error);
        return rejectWithValue(error.response.data);
    }
});
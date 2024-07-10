import { createAsyncThunk } from "@reduxjs/toolkit"; //createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";
import { endpoints } from "../endpoint/endpoint";

// Call Api for Add student
export const addstudent = createAsyncThunk("addstudent", async (data, { rejectWithValue }) => {
    try {
        const apiurl = endpoints.crud.addstudent
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Add student data", response);
        toast.success(response?.data?.msg)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Add student data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for All student
export const allstudent = createAsyncThunk("allstudent", async (_, { rejectWithValue }) => {
    try {
        const apiurl = endpoints.crud.allstudent
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching All student data", response);
        return response?.data?.data;
    } catch (error) {
        console.log("Error Fetching All student data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Delete Student
export const deletestudent = createAsyncThunk("deletestudent", async (id, { rejectWithValue }) => {
    try {
        const apiurl = endpoints.crud.delete
        const response = await axiosInstance.delete(`${apiurl}/${id}`)
        console.log("Fetching Delete Student data", response);
        toast.success(response?.data?.msg)
        return response?.data
    } catch (error) {
        console.log("Error Fetching Delete Student data", error);
        toast.error(error?.response?.data?.msg)
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Details student
export const detailstudent = createAsyncThunk("detailstudent", async (id, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.crud.details}/${id}`
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Details student data", response);
        return response?.data;
    } catch (error) {
        console.log("Error Fetching Details student data", error);
        return rejectWithValue(error.response.data);
    }
});

// Call Api for Edit student
export const editstudent = createAsyncThunk("editstudent", async ({ data, id }, { rejectWithValue }) => {
    try {
        const apiurl = `${endpoints.crud.edit}/${id}`
        const response = await axiosInstance.post(apiurl, data);
        console.log("Fetching Edit student data", response);
        toast.success(response?.data?.message)
        return response.data;
    } catch (error) {
        console.log("Error Fetching Edit student data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});
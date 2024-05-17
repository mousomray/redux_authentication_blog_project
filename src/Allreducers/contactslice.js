import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; // createSlice make state slice and createAsyncThunk handle asynconomous function 
import axiosInstance from "../api/api"
import { toast } from "react-toastify";

// Call Api for create user
export const addcontact = createAsyncThunk("addcontact", async (data, { rejectWithValue }) => {
    try {
        const apiurl = `contact/create`
        const response = await axiosInstance.post(apiurl, data);
        if (response && response?.data?.success === true) {
            console.log("Fetching Add contact data", response);
            toast.success(response?.data?.message)
            return response?.data?.data;
        }else{
            console.log("Error Fetching contact data",response);
            toast.error(response?.data?.message)
            return response?.data?.data
        }
    } catch (error) {
        console.log("Error Fetching Contact Data", error);
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const addcontactslice = createSlice({
    name: "addcontact",
    initialState: {
        addcontacts: [],
        loading: false,
        error: null,
        getData: [],
    },


    extraReducers: (builder) => {
        builder
            
            .addCase(addcontact.pending, (state) => {
                state.loading = true;
            })
            .addCase(addcontact.fulfilled, (state, action) => {
                state.loading = false;
                state.addcontacts.push(action.payload);
            })
            .addCase(addcontact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default addcontactslice.reducer;






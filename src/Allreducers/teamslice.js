import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/api"
// import { endpoints } from "../endpoint/endpoint";
import { myendpoints } from "../endpoint/endpoint";

// Call Api for team Slider
export const team = createAsyncThunk("team", async (_, { rejectWithValue }) => {
    try {
        // const apiurl = endpoints.cms.team
        const apiurl = myendpoints[2]
        const response = await axiosInstance.get(apiurl);
        console.log("Fetching Team data", response);
        return response?.data?.TeamMember
    } catch (error) {
        console.log("Error Fetching Team data", error);
        return rejectWithValue(error.response.data);
    }
});

// createSlice area start
const teamdetails = createSlice({
    name: "teamdetails",
    initialState: {
        teamdata: [],
        loading: false,
        error: null,

    },


    extraReducers: (builder) => {
        builder


            // Details Product
            .addCase(team.pending, (state) => {
                state.loading = true;
            })
            .addCase(team.fulfilled, (state, action) => {
                state.loading = false;
                state.teamdata = action.payload;
            })
            .addCase(team.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default teamdetails.reducer;
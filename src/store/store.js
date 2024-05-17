import { configureStore } from "@reduxjs/toolkit";
import bannerdetails from "../Allreducers/bannerslice"
import servicedetails from "../Allreducers/serviceslice"
import teamdetails from "../Allreducers/teamslice"
import testimonialdetails from "../Allreducers/testimonialslice"
import allblogs from "../Allreducers/blogslice"
import categories from "../Allreducers/categoryslice"
import  allrecents  from "../Allreducers/recentslice";
import categoriesdetails from "../Allreducers/categorydetailsslice";
import blogstoredetails from "../Allreducers/blogdetailslice"
import alllikes from "../Allreducers/likeslice"
import allunlikes from "../Allreducers/unlikeslice"
import allcomments from "../Allreducers/showcommentslice"
import addcommentslice from "../Allreducers/addcommentslice"
import allcourses from "../Allreducers/allcourseslice"
import addcontactslice from "../Allreducers/contactslice"

import {AuthSlice} from "../Auth/authslice" // In this case we use { } because we not do export default only do export



export const store = configureStore({
    reducer: {
        mybanner: bannerdetails, // Reduce for Banner
        myservice: servicedetails, // Reducer for Service
        myteam: teamdetails, // Reducer for Team
        mytestimonial: testimonialdetails, // Reducer for Testimonial
        myallblog: allblogs, // Reducer for All Blog
        myallcategory: categories, // Reducer for All Categories
        myrecentpost: allrecents, // Reducer for All Recent
        mycategorydetails: categoriesdetails, // Reducer for Category details
        myblogdetails: blogstoredetails, // Reducer for Blog Details 
        mylikes: alllikes, // Reducer for Likes
        myunlikes: allunlikes, // Reducer for Likes
        mycomments: allcomments, // Reducer for Show Comment
        myaddcomments: addcommentslice, // Reducer for add comment
        myallcourse: allcourses, // Reducer for All Course
        mycontact: addcontactslice, //Reducer for Contact

        Auth: AuthSlice.reducer, // Reducer for Auth 
        
    },
});
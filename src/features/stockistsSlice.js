import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";
import { loadUser } from "./userAuth";

const initialState = {
    stockists: [],
    loading: false,
    error: null,
    stockist: {},

}


const stockistsSlice = createSlice({

    name: "stockistsSlice",
    initialState,
    reducers: {


    // Get all stockists
    allStockistStart: (state) => {
        state.loading = true
    },

    allStockistSuccess: (state,action) => {
        state.loading = false,
        state.stockists = action.payload
    },

    allStockistFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

// ----------------------------------------------------------------------

    // Get single stockist
    singleStockistStart: (state) => {
        state.loading = true    
    },

    singleStockistSuccess: (state,action) => {
        state.loading = false,
        state.stockist = action.payload
        state.stockist
    },

    singleStockistFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


// ----------------------------------------------------------------------


    // create stockist
    createStockistStart: (state) => {
        state.loading = true    
    },

    createStockistSuccess: (state,action) => {
        state.loading = false
    },

    createStockistFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },



    // delete stockist
    deleteStockistStart: (state) => {
        state.loading = true    
    },

    deleteStockistSuccess: (state,action) => {
        state.loading = false
    },

    deleteStockistFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },


    // update stockist Profile
    updateStockistProfileStart: (state) => {
        state.loading = true    
    },

    updateStockistProfileSuccess: (state,action) => {
        state.loading = false
    },

    updateStockistProfileFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

    }
})

export const {

    allStockistStart,
    allStockistSuccess,
    allStockistFail,
    singleStockistStart,
    singleStockistSuccess,
    singleStockistFail,
    createStockistStart,
    createStockistSuccess,
    createStockistFail,
    deleteStockistStart,
    deleteStockistSuccess,
    deleteStockistFail,
    updateStockistProfileStart,
    updateStockistProfileSuccess,
    updateStockistProfileFail

} = stockistsSlice.actions;

export default stockistsSlice.reducer;







// Actions

const apiUrl = "http://localhost:4001/api/v1/";



// Get all stockists
export const getAllStockists = () => async (dispatch) => {

    dispatch(allStockistStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "get-all-stockists");

        dispatch(allStockistSuccess(response.data.stockists));
    }
    catch(error){
        console.log(error)
        dispatch(allStockistFail())
    }

}



// Get single stockist
export const getSingleStockists = (id) => async (dispatch) => {

    dispatch(singleStockistStart());

    try{
        const response = await apiConnector("GET" , apiUrl + `get-single-stockist/${id}`);

        dispatch(singleStockistSuccess(response.data.stockist));
    }
    catch(error){
        console.log(error)
        dispatch(singleStockistFail())
    }

}



// create a stockist
export const createStockist = (formData,navigate) => async (dispatch) => {

    dispatch(createStockistStart());

    try{
        const response = await apiConnector("POST" , apiUrl + `create-stockist` , formData);

        dispatch(createStockistSuccess());
        toast.success(response.data.message);
        navigate(-1);
    }
    catch(error){
        console.log(error)
        dispatch(createStockistFail())
    }

}




// delete stockist
export const deleteStockist = (id,navigate) => async (dispatch) => {

    
    dispatch(deleteStockistStart());

    try{
        const response = await apiConnector("DELETE" , apiUrl + `delete-stockist/${id}`);

        dispatch(deleteStockistSuccess());
        toast.success(response.data.message);
        navigate("/admin");
    }
    catch(error){
        console.log(error)
        dispatch(deleteStockistFail())
    }

}



// update stockist profile by stockist
export const updateProfileByStockist = (formData,profileSetup) => async (dispatch) => {

    dispatch(updateStockistProfileStart());

    try{
        
        const link = profileSetup ? "update-profile" : "setup-profile"

        const response = await apiConnector(
            `${profileSetup ? "PUT" : "POST"}`,
            apiUrl + link,
            formData,
            { 'Content-Type': 'multipart/form-data' } // Pass headers object with Content-Type
        );

        // console.log(response)

        dispatch(updateStockistProfileSuccess());

        // to update the stockist home or redux state of user
        dispatch(loadUser());
        toast.success(response.data.message);

    }
    catch(error){
        console.log(error);
        dispatch(updateStockistProfileFail())
        // toast.error(error.response.data.message);
    }

}
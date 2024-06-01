import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";

const initialState = {
    loading: false,
    error: null
}

const adminSlice = createSlice({
    name: "cslice",
    initialState,
    reducers: {

        // transaction approvel or rejection
        confirmTransactionStart:(state) => {
            state.loading = true;
        },
        confirmTransactionSuccess:(state,action) => {
            state.loading = false
        },
        confirmTransactionFail:(state,action) => {
            state.loading = false,
            state.error = action.payload
        },

        // create product
        createProductStart:(state) => {
            state.loading = true;
        },
        createProductSuccess:(state,action) => {
            state.loading = false
        },
        createProductFail:(state,action) => {
            state.loading = false,
            state.error = action.payload
        },


    }
});






export const { 

    confirmTransactionStart,
    confirmTransactionSuccess,
    confirmTransactionFail,
    createProductStart,
    createProductSuccess,
    createProductFail,

    } = adminSlice.actions;
export default adminSlice.reducer;





const apiUrl = "http://localhost:4001/api/v1/";



// confirm transaction
export const confirmTransaction = (transactionId , transactionStatus , rejectionReason) => async(dispatch) => {

    dispatch(confirmTransactionStart());

    try{
        const response = await apiConnector("PUT" , apiUrl + "confirm-transaction" , {transactionId , transactionStatus , rejectionReason});

        dispatch(confirmTransactionSuccess());
        toast.success(response?.data?.message);
    }
    catch(error){
        console.log(error)
        dispatch(confirmTransactionFail(error?.response?.data?.message))
        toast.error(error?.response?.data?.message);
    }

}




export const createCategory = ({formData,navigate}) => async(dispatch) => {

    dispatch(createProductStart());
    
    try{
        const response = await apiConnector("POST" , apiUrl + "create-category" , formData);

        dispatch(createProductSuccess());
        toast.success(response?.data?.message);
        navigate(-1);
    }
    catch(error){
        console.log(error)
        dispatch(createProductFail(error?.response?.data?.message))
        toast.error(error?.response?.data?.message);
    }

}


export const createProduct = ({formData,navigate}) => async(dispatch) => {

    dispatch(createProductStart());
    
    try{
        const response = await apiConnector("POST" , apiUrl + "create-product" , formData);

        dispatch(createProductSuccess());
        toast.success(response?.data?.message);
        navigate(-1);
    }
    catch(error){
        console.log(error)
        dispatch(createProductFail(error?.response?.data?.message))
        toast.error(error?.response?.data?.message);
    }

}
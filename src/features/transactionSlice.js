import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";
import axios from "axios";


const initialState = {

    loading: false,
    success: null,
    error: null,
}


const transactionSlice = createSlice({

    name: "transactionSlice",
    initialState,
    reducers: {

        // commit transaction
        commitTransactionStart: (state,action) => {
            state.loading = true
        },

        commitTransactionSuccess: (state,action) => {
            state.loading = false,
            state.success = action.payload
        },

        commitTransactionFail: (state,action) => {
            state.loading = false,
            state.error = action.payload
        },


        // fetch proof
        fetchProofStart: (state,action) => {
            state.loading = true
        },

        fetchProofSuccess: (state,action) => {
            state.loading = false,
            state.success = action.payload
        },

        fetchProofFail: (state,action) => {
            state.loading = false,
            state.error = action.payload
        },


        // fetch transactions
        fetchTransactionsStart: (state,action) => {
            state.loading = true
        },

        fetchTransactionsSuccess: (state,action) => {
            state.loading = false,
            state.transactions = action.payload
        },

        fetchTransactionsFail: (state,action) => {
            state.loading = false,
            state.error = action.payload
        },
    }
})

export const {

    commitTransactionStart,
    commitTransactionSuccess,
    commitTransactionFail,
    fetchProofStart,
    fetchProofSuccess,
    fetchProofFail,
    fetchTransactionsStart,
    fetchTransactionsSuccess,
    fetchTransactionsFail

} = transactionSlice.actions;

export default transactionSlice.reducer;







// Actions

const apiUrl = "http://localhost:4001/api/v1/";




// commiting a transaction
export const commitAdminTransaction = (formData , navigate , setAdminBalanceTransfer) => async(dispatch) => {


    dispatch(commitTransactionStart());

    try{
        const link = 
        formData.type === "Balance Transfer" ? "commit-bl-transaction-admin" : 
        formData.type === "Stock Transfer" ? "commit-st-transaction-admin" : null ;
        
        const response = await apiConnector(
            "POST",
            apiUrl + link,
            formData,
            { 'Content-Type': 'multipart/form-data' } // Pass headers object with Content-Type
        );
          
        // console.log(response);

        dispatch(commitTransactionSuccess(response.data.message));
        toast.success(response?.data?.message);
  
 

        if(setAdminBalanceTransfer){
            setAdminBalanceTransfer(false);
        }
        else{
            navigate(-1);
        }
    }
    catch(error){
        // console.log(error);
        dispatch(commitTransactionFail(error?.response?.data?.message))
        toast.error(error?.response?.data?.message)
    }

}




export const commitStockistTransaction = (formData,navigate,setOn) => async(dispatch) => {  


    dispatch(commitTransactionStart());

    try{
        const link = 
        formData.type === "Balance Transfer" ? "balance-transfer-stk" : 
        formData.type === "Client Transfer" ? "client-transfer-stk" :
        formData.type === "Stock Transfer" ? "stock-transfer-stk" : null ;

        const response = await apiConnector(
            "POST",
            apiUrl + link,
            formData,
            { 'Content-Type': 'multipart/form-data' } // Pass headers object with Content-Type
        );
          
        // console.log(response);

        dispatch(commitTransactionSuccess(response.data.message));
        navigate("/stockist");
        toast.success(response.data.message);
        
        if(setOn){
            setOn(false)
        }
    }
    catch(error){
        // console.log(error);
        dispatch(commitTransactionFail())
        // navigate(-1);
        toast.error(error?.response?.data?.message)
    }

}




// Fetch proof
export const fetchProof = (fileName, filePath) => async (dispatch) => {
    
    dispatch(fetchProofStart());

    try {
        const response = await axios.post(apiUrl + 'fetch-proof', { fileName, filePath }, {
            responseType: 'blob' // Set the response type to 'blob' to handle binary data
        });

        // Create a blob URL for the image
        const imageUrl = URL.createObjectURL(response.data);

        // Open the image in a new tab
        window.open(imageUrl, '_blank');

        dispatch(fetchProofSuccess(response.data.message));
    } catch (error) {
        // console.log(error);
        dispatch(fetchProofFail());
        // toast.error(error.response.data.message)
    }
};



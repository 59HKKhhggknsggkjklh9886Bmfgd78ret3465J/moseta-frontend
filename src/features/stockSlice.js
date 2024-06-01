import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";

const initialState = {
    category: {},
    products: [],
    loading: false,
    error: null,
    stock: [],
    selectedClients: []
};

const stockSlice = createSlice({
    name: "stockSlice",
    initialState,
    reducers: {

        // fetch categories
        fetchCategoryStart: (state, action) => {
            state.loading = true;
        },
        fetchCategorySuccess: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        fetchCategoryFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // fetch products
        setProductsStart: (state, action) => {
            state.loading = true;
        },
        setProductsSuccess: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        setProductsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        
        // fetch stock
        fetchStockStart: (state, action) => {
            state.loading = true;
        },
        fetchStockSuccess: (state, action) => {
            state.loading = false;
            state.stock = action.payload;
        },
        fetchStockFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        

        // fetch clients
        fetchClientsStart: (state, action) => {
            state.loading = true;
        },
        fetchClientsSuccess: (state, action) => {
            state.loading = false;
            state.selectedClients = action.payload;
        },
        fetchClientsFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

export const {
    fetchCategoryStart,
    fetchCategorySuccess,
    fetchCategoryFail,
    setProductsStart,
    setProductsSuccess,
    setProductsFail,
    fetchStockStart,
    fetchStockSuccess,
    fetchStockFail,
    fetchClientsStart,
    fetchClientsSuccess,
    fetchClientsFail,
} = stockSlice.actions;
export default stockSlice.reducer;





const apiUrl = "http://localhost:4001/api/v1/";



// stockist
export const fetchStock = (accountType) => async (dispatch) => {

    dispatch(fetchStockStart());

    try {
        const response = await apiConnector("GET", apiUrl + 'get-stock-stockist');

        dispatch(fetchStockSuccess(response.data.stock));
    } 
    catch (error) {
        // console.log(error);
        dispatch(fetchStockFail());
    }
};





// stockist
export const setProductsInStockSlice = (selectedCategory) => async (dispatch, getState) => {

    dispatch(setProductsStart());
    try {
        const { stock } = getState().stock;

        // Find the category object from the stock array based on the selectedCategory
        const selectedCategoryObj = stock.find((item) => item.category._id === selectedCategory);

        if (selectedCategoryObj) {
            // If category exists, extract its products
            const products = selectedCategoryObj.products;
            dispatch(setProductsSuccess(products));
        } else {
            // If category does not exist, set products to an empty array
            dispatch(setProductsSuccess([]));
        }

        
    } catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message);
        dispatch(setProductsFail(error?.response?.data?.message));
    }
};






export const fetchClients = (clients , clientType) => async (dispatch) => {


    dispatch(fetchClientsStart());

    try {

        const filteredClients = clients.filter(client => client.type === clientType);

        dispatch(fetchClientsSuccess(filteredClients));

    } 
    catch (error) {
        // console.log(error);
        dispatch(fetchClientsFail());
    }
};







// admin
export const fetchStockAdmin = () => async (dispatch) => {

    dispatch(fetchStockStart());

    try {
      
        const response = await apiConnector("GET", apiUrl + 'get-stock-admin');

        dispatch(fetchStockSuccess(response.data.stock));
        
    } 
    catch (error) {
        // console.log(error);
        dispatch(fetchStockFail());
    }
};



// admin
export const setProductsInStockSliceAdmin = (selectedCategory) => async (dispatch, getState) => {

    dispatch(setProductsStart());
    try {
        const { stock } = getState().stock;

        // Find the category object from the stock array based on the selectedCategory
        const selectedCategoryObj = stock.find((item) => item._id === selectedCategory);

        if (selectedCategoryObj) {
            // If category exists, extract its products
            const products = selectedCategoryObj.products;
            dispatch(setProductsSuccess(products));
        } else {
            // If category does not exist, set products to an empty array
            dispatch(setProductsSuccess([]));
        }

        
    } catch (error) {
        // console.log(error);
        dispatch(setProductsFail());
    }
};
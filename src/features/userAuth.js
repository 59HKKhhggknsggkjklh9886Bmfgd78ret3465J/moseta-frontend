import { createSlice } from "@reduxjs/toolkit";
import { apiConnector } from "./apiconnector";
import toast from "react-hot-toast";


const initialState = {
    user: {},
    loading: false,
    error: null,
    isAuth: false,
    accountType: null,
    notifications : [],
    profileSetup: true,
    clients: [],
}


const userAuth = createSlice({

    name: "userAuth",
    initialState,
    reducers: {


    // Login
    loginStart: (state) => {
        state.loading = true
    },

    loginSuccess: (state,action) => {
        state.loading = false,
        state.user = action.payload,
        state.isAuth = true,
        state.accountType = action.payload.accountType   
        state.profileSetup = action.payload?.profileSetup 
        state.clients = action.payload?.clients
    },

    loginFail: (state,action) => {
        state.loading = false,
        state.error = action.payload,
        state.isAuth = false    
    },



    // Load user
    loadUserStart: (state) => {
        state.loading = true
    },

    loadUserSuccess: (state,action) => {
        state.loading = false,
        state.user = action.payload
        state.isAuth = true,
        state.accountType = action.payload.accountType    
        state.profileSetup = action.payload?.profileSetup 
        state.clients = action.payload?.clients
    },

    loadUserFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
        state.isAuth = false
    },

    

    // Logout
    logoutStart: (state) => {
        state.loading = true    
    },

    logoutSuccess: (state) => {
        state.loading = false,
        state.user = null,
        state.isAuth = false
        state.accountType = null    
    },

    logoutFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },



    // Notifications
    notificationsStart: (state) => {
        state.loading = true    
    },

    notificationsSuccess: (state,action) => {
        state.loading = false,
        state.notifications = action.payload
    },

    notificationsFail: (state,action) => {
        state.loading = false,
        state.error = action.payload
    },

    }
})

export const {

    loginStart,
    loginSuccess,
    loginFail,
    loadUserStart,
    loadUserSuccess,
    loadUserFail,
    logoutStart,
    logoutSuccess,
    logoutFail,
    notificationsStart,
    notificationsSuccess,
    notificationsFail

} = userAuth.actions;

export default userAuth.reducer;







// Actions

const apiUrl = "http://localhost:4001/api/v1/";





// Login 
export const login = (formData , navigate , userType) => async (dispatch) => {

    dispatch(loginStart());

    try{

        let link;
        link = userType === "admin" ? "login-admin" : userType === "stockist" ? "stockist-login" : null;
        const response = await apiConnector("POST" , apiUrl + link , formData);

        // console.log(response);

        dispatch(loginSuccess(response.data.user));
        toast.success("Logged in successfully")
    }
    catch(error){
        // console.log(error);
        toast.error(error?.response?.data?.message)
        dispatch(loginFail());
    }

}



// load user
export const loadUser = () => async (dispatch) => {

    dispatch(loadUserStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "load-user");

        // console.log(response);

        dispatch(loadUserSuccess(response.data.user));
    }
    catch(error){
        // console.log(error);
        dispatch(loadUserFail());
    }

}



// logout
export const logout = (navigate) => async (dispatch) => {

    dispatch(logoutStart());

    try{
        const response = await apiConnector("POST" , apiUrl + "logout");


        dispatch(logoutSuccess());
        toast.success("Logout Successfully")
        navigate("/");
    }
    catch(error){
        // console.log(error);
        dispatch(logoutFail());
        toast.error("Logout Fail")
    }

}




// get all notifications
export const getAllNotifications = () => async (dispatch) => {

    dispatch(notificationsStart());

    try{
        const response = await apiConnector("GET" , apiUrl + "get-all-notifications");


        dispatch(notificationsSuccess(response.data.notifications));
    }
    catch(error){
        // console.log(error);
        dispatch(notificationsFail());
    }

}






import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import LoginPage from "../components/Login Page/LoginPage"
import SetupProfile from "../components/Stockist Panel/Setup Profile Stockist/SetupProfile"
import StockistHome from "../components/Stockist Panel/Stockist Home Page/StockistHome"
import StockistTransactionPage from "../components/Stockist Panel/Stockist Transaction Page/StockistTransactionPage"
import Header from "../components/Header/Header"
import ProtectedRoute from "../components/ProtectedRoute"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./features/userAuth"
import AdminHome from "../components/Admin Panel/AdminHome"
import Inventory from "../components/Stockist Panel/Inventory/Inventory"
import AdminHeader from "../components/Admin Panel/Admin Header/AdminHeader"
import NotificationPage from "../components/Admin Panel/Notification/NotificationPage"
import AdminStockTransfer from "../components/Admin Panel/StockTransfer/AdminStockTransfer"
import AdminStockistDetailPage from "../components/Admin Panel/Stockist Data/AdminStockistDetailPage"
import Loader from "../components/Loader/Loader"
import NotFound from "../components/NotFound"



const App = () => {

  const location = useLocation();
  const dispatch = useDispatch();
  const {accountType,loading} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch])


  
  return (
    <div className='appBody'>

    {loading ? <Loader/> :null}     

        {
          accountType === "admin" 
            ? location.pathname !== "/" 
              ? <AdminHeader /> 
              : null 
            : location.pathname !== "/" 
              ? <Header /> 
              : null
        }

        <Routes>
                <Route path = '/' element = {<LoginPage/> } />

                {/* stockist */}
                {/* <Route path = '/setup-profile' element = {<SetupProfile/>} />
                <Route path = '/stockist' element = { <StockistHome/>  } />
                <Route path = '/inventory' element = {<Inventory/>  } />
                <Route path = '/stockist-stock-transfer' element = {  <StockistTransactionPage/> } />
                 */}


                <Route path = '/setup-profile' element = {<ProtectedRoute allowedRoles={["stockist"]}> <SetupProfile/> </ProtectedRoute>} />
                <Route path = '/stockist' element = {<ProtectedRoute allowedRoles={["stockist"]}> <StockistHome/> </ProtectedRoute> } />
                <Route path = '/inventory' element = { <ProtectedRoute allowedRoles={["stockist"]}> <Inventory/> </ProtectedRoute> } />
                <Route path = '/stockist-stock-transfer' element = { <ProtectedRoute allowedRoles={["stockist"]}> <StockistTransactionPage/> </ProtectedRoute>  } />

                
                {/* admin */}
                {/* <Route path = '/admin-stock-transfer/:id' element = { <AdminStockTransfer/>  } />
                <Route path = '/stockist/:id' element = { <AdminStockistDetailPage/> } />
                <Route path = '/admin' element = {  <AdminHome />    } />
                <Route path = '/notification' element = { <NotificationPage/>} /> */}

                <Route path = '/admin-stock-transfer/:id' element = { <ProtectedRoute allowedRoles={["admin"]}> <AdminStockTransfer/> </ProtectedRoute>  } />
                <Route path = '/stockist/:id' element = { <ProtectedRoute allowedRoles={["admin"]}> <AdminStockistDetailPage/> </ProtectedRoute> } />
                <Route path = '/admin' element = { <ProtectedRoute allowedRoles={["admin"]}> <AdminHome />  </ProtectedRoute>  } />
                <Route path = '/notification' element = { <ProtectedRoute allowedRoles={["admin"]}> <NotificationPage/> </ProtectedRoute>} />


                {/* not found */}
                <Route path="*" element={<NotFound/>} />
        </Routes>
    </div>
  )
}

export default App
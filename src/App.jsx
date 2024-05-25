import { Route, Routes, useLocation } from "react-router-dom"
import "./App.css"
import LoginPage from "../components/Login Page/LoginPage"
import SetupProfile from "../components/Stockist Panel/Setup Profile Stockist/SetupProfile"
import StockistHome from "../components/Stockist Panel/Stockist Home Page/StockistHome"
import StockistTransactionPage from "../components/Stockist Panel/Stockist Transaction Page/StockistTransactionPage"
import Header from "../components/Header/Header"
import ProtectedRoute from "../components/ProtectedRoute"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadUser } from "./features/userAuth"


const App = () => {

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  },[dispatch])


  return (
    <div className='appBody'>

      {location.pathname !== "/" ? <Header/> : null}
      
        <Routes>
                {/* <Route path = '/' element = {<LoginPage/>} /> */}
                <Route path = '/' element = {<StockistHome/>} />
                {/* <Route path = '/setup-profile' element = {<ProtectedRoute allowedRoles={["stockist"]}> <SetupProfile/> </ProtectedRoute>} />
                <Route path = '/stockist' element = {<ProtectedRoute allowedRoles={["stockist"]}> <StockistHome/> </ProtectedRoute> } /> */}
                <Route path = '/setup-profile' element = {<SetupProfile/>}/>
                <Route path = '/stockist' element = {<StockistHome/>} />
                <Route path = '/transaction' element = { <StockistTransactionPage/> } />
        </Routes>
    </div>
  )
}

export default App
import React, { useEffect } from 'react'
import "./adminHome.css"
import AdminHomeTable from '../Tables/AdminHomeTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStockAdmin } from '../../src/features/stockSlice'

const AdminHome = ({adminNavType, setAdminNavType}) => {
    ()=>setAdminNavType(false)

    const dispatch = useDispatch();

   

    useEffect(() => {
      dispatch(fetchStockAdmin());
    },[])
 

  return (
    <div className='adminHomeBody'>
        
      <div className='homeTableContainer'>
        <AdminHomeTable/>
      </div>

    </div>
  )
}

export default AdminHome
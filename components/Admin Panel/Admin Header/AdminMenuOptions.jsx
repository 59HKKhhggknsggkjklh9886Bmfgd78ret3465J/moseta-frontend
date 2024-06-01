import React, { useState } from 'react'
import "./adminMenuOptions.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../src/features/userAuth'
import CreateNewCategory from './CreateNewCategory'
import CreateNewProduct from './CreateNewProduct'

const AdminMenuOptions = ({menuSelect,setCreateStockistOn}) => {

  const {isAuth , accountType} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createProductOn, setCreateProductOn] = useState(false)
  const [createCategoryOn, setCreateCategoryOn] = useState(false)

  const logoutHandler = () => {
    dispatch(logout(navigate));
  }

  return (
    <div className={menuSelect ? "activeadminMenuOptions" : "InActiveadminMenuOptions"}>

        <Link className='menuOptionHomeLink' to={`${accountType == 'admin' ? '/admin' : '/stockist'}`}>Home</Link>

        <button onClick={()=>{
          setCreateStockistOn(true)
        }}>Create Stockist</button>

        <p onClick={()=>{
          setCreateCategoryOn(true)
        }}>Create New Category</p>

        <p onClick={()=>{
          setCreateProductOn(true)
        }}>Create New Product</p>
        
        <p onClick={logoutHandler}>Logout</p>
        
        <CreateNewCategory createCategoryOn={createCategoryOn} setCreateCategoryOn={setCreateCategoryOn}/>
        <CreateNewProduct createProductOn={createProductOn} setCreateProductOn={setCreateProductOn}/>
    </div>
  )
}

export default AdminMenuOptions
import React from 'react'
import "./menuOptions.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../src/features/userAuth'

const MenuOptions = ({menuSelect}) => {

  const {isAuth , accountType} = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <div className={menuSelect ? "activeMenuOptions" : "InActiveMenuOptions"}>
        <Link className='menuOptionHomeLink' to={`${accountType == 'admin' ? '/admin' : '/stockist'}`}>Home</Link>
        <p onClick={logoutHandler}>Logout</p>
    </div>
  )
}

export default MenuOptions
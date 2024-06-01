import React from 'react'
import "./menuOptions.css"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../src/features/userAuth'

const MenuOptions = ({menuSelect,setOn,setClientOn,setCreateClientOn , setMenuSelect}) => {

  const {isAuth , accountType} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout(navigate));
  }

  return (
    <div className={menuSelect ? "activeMenuOptions" : "InActiveMenuOptions"}>

        <Link onClick={() => setMenuSelect(false)} className='menuOptionHomeLink' to={`${accountType == 'admin' ? '/admin' : '/stockist'}`}>Home</Link>

        <Link onClick={() => setMenuSelect(false)} to={"/stockist-stock-transfer"} > Stock Transfer </Link>

        <Link onClick={() => setMenuSelect(false)} to={"/inventory"} > Inventory </Link>
        
    
        <button onClick={()=>{
            setOn(true),
            setMenuSelect(false)
        }}>Balance Transfer
        </button>


        <button onClick={()=>{
          setClientOn(true),
          setMenuSelect(false)
        }}>Client Transfer
        </button>


        <button onClick={()=>{
          setCreateClientOn(true),
          setMenuSelect(false)
        }}>Create Client 
        </button>
        

        <p onClick={logoutHandler}>Logout</p>

    </div>
  )
}

export default MenuOptions
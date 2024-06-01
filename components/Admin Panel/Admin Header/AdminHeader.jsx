import React, { useState } from 'react'
import "./adminHeader.css"
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';
import { IoNotifications } from 'react-icons/io5';
import CreateStockist from './CreateStockist';
import AdminMenuOptions from './AdminMenuOptions';


const AdminHeader = () => {
    const [menuSelect, setMenuSelect] = useState(false)

    const [createStockistOn, setCreateStockistOn] = useState(false);

    const [showNotif, setShowNotif] = useState(false)

  return (
    <div className="adminHeaderBody">

        <Link to={"/admin"} className='siteLogo'>
          <p>MO<span>S</span>ETA</p>
        </Link>

        <div className="headerMenu">
          <div> 
              <div className=''>
            <Link className='adminNotificationIcon' to="/notification">
                  <IoNotifications />
            </Link>
              </div>
            
          </div>
        
        
          <div className='stockistCreateTransaction'>

              <button onClick={()=>{
                setCreateStockistOn(true)
              }}>Create Stockist</button>
          
          </div>  

          <div className='menuIcon' onClick={()=>{setMenuSelect(!menuSelect)}}>
            <IoIosMenu />
          </div>
            <div className='adminHederMenuIcon'>
                <AdminMenuOptions menuSelect = {menuSelect} setCreateStockistOn={setCreateStockistOn}/>
            </div>
        </div>
        
        <CreateStockist createStockistOn={createStockistOn} setCreateStockistOn={setCreateStockistOn}/>
    </div>
  )
}

export default AdminHeader
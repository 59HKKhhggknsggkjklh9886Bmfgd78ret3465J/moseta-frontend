import React, { useState } from 'react'
import "./header.css"
import { IoIosMenu } from "react-icons/io";
import MenuOptions from './MenuOptions';
import { Link } from 'react-router-dom';
import BalanceTransfer from '../Stockist Panel/Balance Transfer/BalanceTransfer';
import ClientTransfer from '../Stockist Panel/Client Transfer/ClientTransfer';

const Header = () => {
    const [menuSelect, setMenuSelect] = useState(false)

    
    const [on , setOn] = useState(false);

    const [clientOn, setClientOn] = useState(false);

  return (
    <div className="headerBody">

        <Link to={"/"} className='siteLogo'>
          <p>MO<span>S</span>ETA</p>
        </Link>

        <div className="headerMenu">
          
        <div className='stockistCreateTransaction'>

        <button onClick={()=>{
            setOn(true)
        }}>Balance Transfer</button>
        <Link to="/transaction">
            <button>Stock Transfer</button>
        </Link>
        <button onClick={()=>{
          setClientOn(true)
        }}>Client Transfer</button>
        </div>

          <div className='menuIcon' onClick={()=>{setMenuSelect(!menuSelect)}}>
            <IoIosMenu />
          </div>
            <div>
                <MenuOptions menuSelect = {menuSelect}/>
            </div>
        </div>
        <BalanceTransfer on={on} setOn={setOn}/>
            <ClientTransfer clientOn={clientOn} setClientOn={setClientOn}/>
    </div>
  )
}

export default Header
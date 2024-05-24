import React, { useState } from 'react'
import "./header.css"
import { IoIosMenu } from "react-icons/io";
import MenuOptions from './MenuOptions';
import { Link } from 'react-router-dom';

const Header = () => {
    const [menuSelect, setMenuSelect] = useState(false)
  return (
    <div className="headerBody">

        <Link to={"/"} className='siteLogo'>
          <p>MO<span>S</span>ETA</p>
        </Link>

        <div className="headerMenu">
          
          <Link to="/transaction" className='stockistCreateTransaction'>
              <button>Create Transaction</button>
          </Link>

          <div className='menuIcon' onClick={()=>{setMenuSelect(!menuSelect)}}>
            <IoIosMenu />
          </div>
            <div>
                <MenuOptions menuSelect = {menuSelect}/>
            </div>
        </div>
    </div>
  )
}

export default Header
import React, { useState, useEffect } from 'react';
import "./header.css";
import { IoIosMenu } from "react-icons/io";
import MenuOptions from './MenuOptions';
import { Link } from 'react-router-dom';
import BalanceTransfer from '../Stockist Panel/Balance Transfer/BalanceTransfer';
import ClientTransfer from '../Stockist Panel/Client Transfer/ClientTransfer';
import CreateClient from '../Stockist Panel/Create Client/CreateClient';

const Header = () => {
    const [menuSelect, setMenuSelect] = useState(false);
    const [on, setOn] = useState(false);
    const [clientOn, setClientOn] = useState(false);
    const [createClientOn, setCreateClientOn] = useState(false);

    
  // hide burger menu if click anywhere in the screen
    useEffect(() => {
        // Function to handle click events on the document body
        const handleClickOutside = (event) => {
            const header = document.getElementById('header');
            if (header && !header.contains(event.target)) {
                setMenuSelect(false); // Clicked outside the header, so close the menu
            }
        };

        // Attach event listener when component mounts
        document.addEventListener('click', handleClickOutside);

        // Clean up the event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div className="headerBody" id="header">
            <Link to={"/stockist"} className='siteLogo'>
                <p>MO<span>S</span>ETA</p>
            </Link>
            <div className="headerMenu">
                <div className='stockistCreateTransaction'>
                    <button onClick={() => { setOn(true) }}>Balance Transfer</button>
                    <button onClick={() => { setClientOn(true) }}>Client Transfer</button>
                    <button onClick={() => { setCreateClientOn(true) }}>Create Client</button>
                </div>
                <div className='menuIcon' onClick={() => { setMenuSelect(!menuSelect) }}>
                    <IoIosMenu />
                </div>
                <div>
                    <MenuOptions 
                      menuSelect={menuSelect} 
                      setOn={setOn} 
                      setClientOn={setClientOn} 
                      setCreateClientOn={setCreateClientOn} 
                      setMenuSelect={setMenuSelect}
                    />
                </div>
            </div>
            <BalanceTransfer on={on} setOn={setOn} />
            <ClientTransfer clientOn={clientOn} setClientOn={setClientOn} />
            <CreateClient createClientOn={createClientOn} setCreateClientOn={setCreateClientOn} />
        </div>
    );
};

export default Header;

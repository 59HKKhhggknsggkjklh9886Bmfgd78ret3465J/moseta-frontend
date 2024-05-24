import React from 'react'
import "./stockistProfile.css"
import ProfitGraph from './ProfitGraph'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const StokistProfile = () => {
    
    const {user} = useSelector((state) => state.user);
    
  return (
    <div className='stockistProfileBody'>
        <div>
            <div className='stockistProfilePicBackground'>
                <div>
                    <img className='stockistProfilePic' src="../public/einstein fox.png" alt="" />
                </div>
            </div>
            <div className='stockistProfileData'>
                <div>
                    <h1>Name</h1>
                    <h2>{user?.name}</h2>
                </div>
                <div>
                    <h1>Username</h1>
                    <h2>{user?.username}</h2>
                </div>
                <div>
                    <h1>GSTIN</h1>
                    <h2> {user?.profile?.gstNo} </h2>
                </div>
                <div>
                    <h1>Address</h1>
                    <h2 className='stockistAddress'>{user?.profile?.address}</h2>
                </div>
                <div>
                    <h1>Contact Number</h1>
                    <h2>{user?.profile?.contactNo}</h2>
                </div>
                <div>
                    <h1>Trade Name</h1>
                    <h2>{user?.profile?.tradeName}</h2>
                </div>
                
                <Link to="/setup-profile">
                    <button className='editStockistProfileBtn'>Edit</button>
                </Link>
            </div>
        </div>
        
            {/* <h1 className='monthlyProfitTitle'>Monthly Profit</h1>
            <ProfitGraph/> */}
        
    </div>
  )
}

export default StokistProfile
import React, { useEffect } from 'react'
import "./stockistProfile.css"
import ProfitGraph from './ProfitGraph'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import StockistsAdminTableConfirmend from '../../Tables/StockistsAdminTableConfirmed'
import StockistsAdminTablePending from '../../Tables/StockistsAdminTablePending'
import RejectedTransactionsTable from '../../Tables/RejectedTransactionTable'

const StokistProfile = () => {
    
    const {user} = useSelector((state) => state.user);
    const transactions = user?.transactions;
    const rejectedTransactions = user?.rejectedTransactions;
    const dispatch = useDispatch();

    const revTransactions = [];

    let idx = 1
    for (idx = 1 ; idx <= transactions.length ; idx++)
    {
        revTransactions.push(transactions[transactions.length - idx])
    }


  return (
    <div className='stockistProfileBody'>
        <div>

            <div className='stockistProilePicContainer'>
                <div className='stockistProfilePicBackground'>
                    <div>
                        <img className='stockistProfilePic' src={`${user?.profile?.image?.secureUrl}`} alt="" />
                    </div>
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

                <div>
                    <h1>Profit This Month</h1>
                    <h2>₹ {user?.profitThisMonth}</h2>
                </div>
                
                <Link to="/setup-profile">
                    <button className='editStockistProfileBtn'>Edit</button>
                </Link>

            </div>
            
        </div>
        
            {/* <div className='profitContainer'>
                <h1 className='monthlyProfitTitle'>Monthly Profit</h1>
                <ProfitGraph/>
            </div> */}
            
            <div className='tableContainerSTK'>

                <div className='tableMain'>
                    <h2 className='tableHeadingSTK'>Approved Transactions</h2>
                    <StockistsAdminTableConfirmend transactions={revTransactions}/>
                </div>

                <div className='tableMain'>
                    <h2 className='tableHeadingSTK'>Pending Transactions</h2>
                    <StockistsAdminTablePending transactions={revTransactions} />
                </div>

                <div className='tableMain'>
                    <h2 className='tableHeadingSTK'>Rejected Transactions</h2>
                    <RejectedTransactionsTable transactions={rejectedTransactions} />
                </div>
                

            </div>
    </div>
  )
}

export default StokistProfile
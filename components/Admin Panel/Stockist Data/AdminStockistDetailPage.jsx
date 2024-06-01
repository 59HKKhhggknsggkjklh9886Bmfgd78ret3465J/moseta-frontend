import React, { useEffect, useState } from 'react'
import "./adminStockistDetailPage.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStockist, getSingleStockists } from '../../../src/features/stockistsSlice'
import AdminBalanceTransfer from '../Balance Transfer/AdminBalanceTransfer'
import AdminsStockistTableConfirmed from '../../Tables/AdminsStockistTableConfirmed'
import AdminsStockistTablePending from '../../Tables/AdminsStockistTablePending'
import Loader from '../../Loader/Loader'
import RejectedTransactionsTable from '../../Tables/RejectedTransactionTable'

const AdminStockistDetailPage = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const {stockist} = useSelector((state) => state.stockist);
    const [adminBalanceTransferOn, setAdminBalanceTransferOn] = useState(false);
    const {loading} = useSelector((state) => state.admin);

    // reversing transaction array
    const transactions = stockist?.transactions || [];
    
    const revTransactions = [];

    let idx = 1
    for (idx = 1 ; idx <= transactions.length ; idx++)
    {
        revTransactions.push(transactions[transactions.length - idx])
    }

    const rejectedTransactions = stockist?.rejectedTransactions || [];


    // delete stockist
    const deleteStockistHandler = () => {
        const confirm = window.confirm("Are you sure , you want to delete this stockist ?")

        if(confirm){
            dispatch(deleteStockist(params.id , navigate))
        }
    }

    // fetching stockist details
    useEffect(() => {
        dispatch(getSingleStockists(params.id));
    },[params.id , dispatch , adminBalanceTransferOn])




  return (
    <div className='adminStockistProfileBody'>

        {loading ? <Loader/> : null}
        
        <div className='adminStockistProfile'>

            <div className='adminStockistProfilePicBackgroundParent'>
                <div className='adminStockistProfilePicBackground'>
                    <div>
                        <img className='adminStockistProfilePic' src={`${stockist?.profile?.image?.secureUrl}`} alt="" />
                    </div>
                </div>
            </div>

            <div className='adminStockistProfileData'>

                <div>
                    <h1>Name</h1>
                    <h2>{stockist?.name}</h2>
                </div>
                <div>
                    <h1>Username</h1>
                    <h2>{stockist?.username}</h2>
                </div>
                <div>
                    <h1>GSTIN</h1>
                    <h2> {stockist?.profile?.gstNo} </h2>
                </div>
                <div>
                    <h1>Address</h1>
                    <h2 className='adminStockistAddress'>{stockist?.profile?.address}</h2>
                </div>
                <div>
                    <h1>Contact Number</h1>
                    <h2>{stockist?.profile?.contactNo}</h2>
                </div>
                <div>
                    <h1>Trade Name</h1>
                    <h2>{stockist?.profile?.tradeName}</h2>
                </div>

                <div>
                    <h1>Profit This Month</h1>
                    <h2>₹ {stockist?.profitThisMonth}</h2>
                </div>
                
                <div className='stockistDetailPageBtns'>

                    <Link to={`/admin-stock-transfer/${params.id}`}> 
                        <button className='editadminStockistProfileCommitTransactionBtn'> Stock Transfer </button>
                    </Link>
                    
                    <button className='editadminStockistProfileCommitTransactionBtn' onClick={()=>setAdminBalanceTransferOn(true)}> Balance Transfer </button>
                    
                    <button className='editadminStockistProfileDeleteBtn' onClick={deleteStockistHandler}>Delete</button>

                </div>

            </div>
            
        </div>
        
            {/* <div className='profitContainer'>
                <h1 className='monthlyProfitTitle'>Monthly Profit</h1>
                <ProfitGraph/>
            </div> */}
            
            <div className='tableContainer'>

                <div>
                    <h2 className='tableHeading'>Approved Transactions</h2>
                    <AdminsStockistTableConfirmed transactions={revTransactions}/>
                </div>

                {/* <div>
                    <h2 className='tableHeading'>Pending Transactions</h2>
                    <AdminsStockistTablePending transactions={revTransactions} />
                </div>

                <div>
                    <h2 className='tableHeading'>Rejected Transactions</h2>
                    <RejectedTransactionsTable transactions={rejectedTransactions} />
                </div> */}
            </div>

            <AdminBalanceTransfer adminBalanceTransferOn={adminBalanceTransferOn} setAdminBalanceTransferOn={setAdminBalanceTransferOn}/>
    </div>
  )
}

export default AdminStockistDetailPage
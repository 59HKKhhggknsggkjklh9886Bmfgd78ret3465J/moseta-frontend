import React, { useState } from 'react'
import "./adminBalanceTransfer.css"
import { MdClose } from "react-icons/md";
import { commitAdminTransaction, commitStockistTransaction } from '../../../src/features/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom'; 

const AdminBalanceTransfer = ({adminBalanceTransferOn, setAdminBalanceTransferOn}) => {

    const {loading} = useSelector((state) => state.transaction);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    
    const [documentNo , setDocumentNo] = useState("");
    const [totalAmount , setTotalAmount] = useState("");
    const [file , setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // commit transaction handler
    const commitTransaction = (e) => {
        e.preventDefault();
        const formData = {
            type: "Balance Transfer",
            totalAmount,
            documentNo,
            file,
            stockistId: params.id
        };

        // validations
        if(!totalAmount){
            toast.error("Please enter an Amount")
            return
        }
        if(
            !formData.documentNo
        ){
            toast.error("Please Enter Document Number");
            return;
        }

        if(
            !file
        ){
            toast.error("Please Upload Proof.");
            return;
        }



        dispatch(commitAdminTransaction(formData , navigate , setAdminBalanceTransferOn));
    };
    
  return (
    <div className={adminBalanceTransferOn ? 'adminBalanceTransferBody' : 'adminBalanceTransferBodyOff'}>
        
        {loading ? <Loader/> : null}
       
        <div className='adminBalanceTransferPopupBody'>

            <div onClick={()=>{setAdminBalanceTransferOn(false)}} className='adminBalanceTransferBodyClose'>
                <p><MdClose /></p>
            </div>

            <p className='adminBalanceTransferTitle'>Balance Transfer</p>

            
            <form className='adminBalanceTransferContent' onSubmit={commitTransaction}>

                <div className='adminBalanceTransferData'>
                    <label  className="adminBalanceTransferLabel">
                        Delivery Challan No./ T. Invoice No.
                    </label>
                    <input required type='text' value={documentNo} onChange={(e) => setDocumentNo(e.target.value)}/>
                </div>

                <div className='adminBalanceTransferData'>
                    <label  className="adminBalanceTransferLabel">
                        Amount
                    </label>
                    <input required
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='adminBalanceTransferData'>
                    <label  className="adminBalanceTransferLabel">
                        Data
                    </label>
                    <input type='date' required
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='adminBalanceTransferData'>
                    <p>Proof</p>
                    <label className="adminBalanceTransferCustomLabel">
                        Upload Your File
                        <input type="file" onChange={handleFileChange}/>
                    </label>
                </div>

                <div className='adminBalanceTransferCommitTransaction'>
                    <button type='submit'>Commit Transaction</button>
                </div>
            </form>
            
            
        </div>

    </div>
  )
}

export default AdminBalanceTransfer
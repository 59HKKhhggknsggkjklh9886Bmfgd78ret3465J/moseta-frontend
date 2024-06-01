import React, { useState } from 'react'
import "./balanceTransfer.css"
import { MdClose } from "react-icons/md";
import { commitStockistTransaction } from '../../../src/features/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const BalanceTransfer = ({on, setOn}) => {

    const {loading} = useSelector((state) => state.transaction);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
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
            file
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



        dispatch(commitStockistTransaction(formData , navigate , setOn));
    };

  return (
    <div className={on ? 'balanceTransferBody' : 'balanceTransferBodyOff'}>
    
        {loading ? <Loader/> : null}
       
        <div className='balanceTransferPopupBody'>

            <div onClick={()=>{setOn(false)}} className='balanceTransferBodyClose'>
                <p><MdClose /></p>
            </div>

            <p className='balanceTransferTitle'>Balance Transfer</p>

            
            <form className='balanceTransferContent' onSubmit={commitTransaction}>

                <div className='balanceTransferData'>
                    <label  className="balanceTransferLabel">
                        Delivery Challan No./ T. Invoice No.
                    </label>
                    <input className='balanceTransferFormInput' required type='text' value={documentNo} onChange={(e) => setDocumentNo(e.target.value)}/>
                </div>

                <div className='balanceTransferData'>
                    <label  className="balanceTransferLabel">
                        Date
                    </label>
                    <input className='balanceTransferFormInput' required type='date'
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='balanceTransferData'>
                    <label  className="balanceTransferLabel">
                        Amount
                    </label>
                    <input className='balanceTransferFormInput' required
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                            }
                        }}
                    />
                </div>



                <div className='balanceTransferData'>
                    <p>Proof</p>
                    <label className="balanceTransferCustomLabel">
                        Upload Your File
                        <input className='balanceTransferFormInput' type="file" onChange={handleFileChange}/>
                    </label>
                </div>

                <div className='balanceTransferCommitTransaction'>
                    <button type='submit'>Commit Transaction</button>
                </div>
            </form>
            
            
        </div>

    </div>
  )
}

export default BalanceTransfer
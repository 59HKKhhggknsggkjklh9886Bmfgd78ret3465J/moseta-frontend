import React, { useEffect, useState } from 'react'
import "./clientTransfer.css"
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchClients } from '../../../src/features/stockSlice';
import { commitStockistTransaction } from '../../../src/features/transactionSlice';
import Loader from '../../Loader/Loader';
import toast from 'react-hot-toast';

const ClientTransfer = ({clientOn, setClientOn}) => {

    const {loading} = useSelector((state) => state.transaction);
    const {clients} = useSelector((state) => state.user);
    const {selectedClients} = useSelector((state) => state.stock);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [documentNo , setDocumentNo] = useState("");
    const [totalAmount , setTotalAmount] = useState("");
    const [file , setFile] = useState(null);
    const [selectedClient , setSelectedClient] = useState("");
    const [clientType, setClientType] = useState("");


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    // on client type change
    const clientTypeChange = (e) => {
        setClientType(e.target.value);
    }

    // for fetching clients on client type change
    useEffect(() => {
        dispatch(fetchClients(clients , clientType))
    },[clientType])



        // commit transaction handler
        const commitTransaction = (e) => {

            e.preventDefault();

            const formData = {
                type: "Client Transfer",
                totalAmount,
                documentNo,
                clientId: selectedClient,  
                file
            };
    
            // validations
            if(
                !selectedClient 
            ){
                toast.error("Please select a client.");
                return;
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
    
    
    
            dispatch(commitStockistTransaction(formData , navigate , setClientOn));
            
        };

  return (
    <div className={clientOn ? 'clientTransferBody' : 'clientTransferBodyOff'}>

        {loading ? <Loader/> : null}

        <div className='clientTransferPopupBody'>

            <div onClick={()=>{setClientOn(false)}} className='clientTransferBodyClose'>
                <p><MdClose /></p>
            </div>

            <p className='clientTransferTitle'>Client Transfer</p>
                
            <form className='clientTransferContent' onSubmit={commitTransaction}>

                    <div className='stockistTransactionOptions'>
                            <label>
                                <input type="radio" name="abc" value="distributor" onChange={(e) => clientTypeChange(e)} />Distributor
                            </label>
                            <label>
                                <input type="radio" name="abc" value="store" onChange={(e) => clientTypeChange(e)} />Store
                            </label>
                            <label>
                                <input type="radio" name="abc" value="customer" onChange={(e) => clientTypeChange(e)} />Customer
                            </label>
                    </div>

                <div className='formInputContainer'>

                    <div className='clientTransferData'>
                        <p>Clients : </p>
                        <select className='clientSelectInput' onChange={(e) => setSelectedClient(e.target.value)}>
                            <option>Select Client</option>
                            {selectedClients.map((client , key) => (
                            
                                <option key={key} value={client?._id}> {client.name} </option>
                            ))}
                        </select>
                    </div>

                    <div className='clientTransferData'>
                        <p>
                            Delivery Challan No./ T. Invoice No.
                        </p>
                        <input required type='text' value={documentNo} onChange={(e) => setDocumentNo(e.target.value)}/>
                    </div>

                    <div className='clientTransferData'>
                        <p>Date</p>
                        <input required type='date'
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                        />
                    </div>

                    <div className='clientTransferData'>
                        <p>
                            Amount
                        </p>
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

                    <div className='clientTransferData'>
                        <p>Proof</p>
                        <label className="clientTransferCustomLabel">
                            Upload Your File
                            <input type="file" onChange={handleFileChange}/>
                        </label>
                    </div>

                    <div className='clientTransferCommitTransaction'>
                        <button type='submit'>Commit Transaction</button>
                    </div>

                </div>
                    
            </form>

            
        </div>

    </div>
  )
}

export default ClientTransfer
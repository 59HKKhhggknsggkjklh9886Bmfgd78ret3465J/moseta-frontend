import React from 'react'
import "./clientTransfer.css"
import { MdClose } from "react-icons/md";

const ClientTransfer = ({clientOn, setClientOn}) => {
  return (
    <div className={clientOn ? 'clientTransferBody' : 'clientTransferBodyOff'}>

        <div className='clientTransferPopupBody'>

            <div onClick={()=>{setClientOn(false)}} className='clientTransferBodyClose'>
                <p><MdClose /></p>
            </div>

            <p className='clientTransferTitle'>Client Transfer</p>
                
            <form className='clientTransferContent'>

                    <div className='stockistTransactionOptions'>
                            <label>
                                <input type="radio" name="abc" value="distributor" onChange={(e) => clientChangeHandler(e)} />Distributor
                            </label>
                            <label>
                                <input type="radio" name="abc" value="store" onChange={(e) => clientChangeHandler(e)} />Store
                            </label>
                            <label>
                                <input type="radio" name="abc" value="customer" onChange={(e) => clientChangeHandler(e)} />Customer
                            </label>
                    </div>

                <div className='formInputContainer'>

                    <div className='clientTransferDropDown'>
                        <p>Clients : </p>
                        <select>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                            <option>1</option>
                        </select>
                    </div>

                    <div className='clientTransferData'>
                        <label  className="clientTransferLabel">
                            Document Number
                        </label>
                        <input required type='text'/>
                    </div>

                    <div className='clientTransferData'>
                        <label  className="clientTransferLabel">
                            Amount
                        </label>
                        <input required
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
                            <input type="file"/>
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
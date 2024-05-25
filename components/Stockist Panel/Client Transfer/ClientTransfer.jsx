import React from 'react'
import "./clientTransfer.css"
import { MdClose } from "react-icons/md";

const ClientTransfer = ({clientOn, setClientOn}) => {
  return (
    <div className={clientOn ? 'balanceTransferBody' : 'balanceTransferBodyOff'}>
        <div className='balanceTransferPopupBody'>
            <div onClick={()=>{setClientOn(false)}} className='balanceTransferBodyClose'>
                <p><MdClose /></p>
            </div>
            <p className='balanceTransferTitle'>Client Transfer</p>
            <form className='balanceTransferContent'>

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

                <div className='balanceTransferData'>
                    <label  className="balanceTransferLabel">
                        Document Number
                    </label>
                    <input required type='text'/>
                </div>
                <div className='balanceTransferData'>
                    <label  className="balanceTransferLabel">
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
                <div className='balanceTransferData'>
                    <p>Proof</p>
                    <label className="balanceTransferCustomLabel">
                        Upload Your File
                        <input type="file"/>
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

export default ClientTransfer
import React from 'react'
import "./balanceTransfer.css"
import { MdClose } from "react-icons/md";

const BalanceTransfer = ({on, setOn}) => {
  return (
    <div className={on ? 'balanceTransferBody' : 'balanceTransferBodyOff'}>
        <div className='balanceTransferPopupBody'>
            <div onClick={()=>{setOn(false)}} className='balanceTransferBodyClose'>
                <p><MdClose /></p>
            </div>
            <p className='balanceTransferTitle'>Balance Transfer</p>
            <div className='balanceTransferContent'>

            
            <form className=''>
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

    </div>
  )
}

export default BalanceTransfer
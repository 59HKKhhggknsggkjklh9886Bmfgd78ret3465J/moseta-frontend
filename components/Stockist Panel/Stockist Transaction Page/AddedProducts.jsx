import React, { useEffect, useState } from 'react';
import "./addedProducts.css";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalPrice, decreaseProductQuantity, deleteFromCart, increaseProductQuantity } from '../../../src/features/cartSlice';
import { commitStockistTransaction } from '../../../src/features/transactionSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddedProducts = ({selectedClient}) => {
    const { cart, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [installationCharges, setInstallationCharges] = useState("");
    const [transportationCharges, setTransportationCharges] = useState("");
    const [documentNo, setDocumentNo] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();


    const installationChargesHandler = (e) => {
        setInstallationCharges(e.target.value);
    }

    const transportationChargesHandler = (e) => {
        setTransportationCharges(e.target.value)
    }

    const [calculatedTotalPrice , setCalculatedTotalPrice] = useState(0);
    useEffect(() => {
        setCalculatedTotalPrice(Number(totalPrice) + Number(installationCharges)  + Number(transportationCharges))
    },[totalPrice , installationCharges , transportationCharges])


    const deleteHandler = (product, key) => {
        dispatch(deleteFromCart({ product, key }));
    };

    const increaseQtyHandler = (product, key) => {
        dispatch(increaseProductQuantity({ product, key }));
    };

    const reduceQtyHandler = (product, key) => {
        dispatch(decreaseProductQuantity({ product, key }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };


    
    // commit transaction handler
    const commitTransaction = () => {

        const formData = {
            type: "Stock Transfer",
            totalAmount: calculatedTotalPrice,
            products: cart,
            documentNo,
            clientId: selectedClient,  
            installationCharges,
            transportationCharges,
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
            formData.products.length < 1
        ){
            toast.error("Please Select Products to Transfer");
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



        dispatch(commitStockistTransaction(formData , navigate));
    };

    
    return (
        <div className='addedProductsBody'>
            <h2 className='addedProductsTitle'>Added Products</h2>

            <div className='addedProductsDetails'>
                {cart.map((item, key) => (
                    item.products.map((product, k) => (
                        <div key={k} className='addedProduct'>
                            <p className='addedProductName'>{product.product.name}</p>
                            <div className='addedProductQuantity'>
                                <p className='addedProductQuantityChangeBtn' onClick={() => reduceQtyHandler(product.product, key)}>-</p>
                                <p className='addedProductQuantityNumber'>{product.quantity}</p>
                                <p className='addedProductQuantityChangeBtn' onClick={() => increaseQtyHandler(product.product, key)}>+</p>
                            </div>
                            <p className='addedProductPrice'>₹{(product.priceAfterDiscount * product.quantity).toFixed(2)}</p>
                            <p className='addedProductDiscount'>-{product.discount}%</p>
                            <button className='addedProductDelete' onClick={() => deleteHandler(product, key)}><MdDelete /></button>
                        </div>
                    ))
                ))}
            </div>

            <div className='cartDetails'>
                <form className='cartDetailsContainer' onSubmit={(e) => { e.preventDefault(); commitTransaction(); }}>

                    <div className='additionalCharges'>

                    <div className='stockTransferDate'>
                        <label  className="stockTransferLabel">
                            Date
                        </label>
                        <input type='date' required
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}
                        />
                    </div>

                        <label>
                            <p>Transportation Charges</p>
                            <input
                                placeholder='(Optional)'
                                value={transportationCharges}
                                onChange={(e) => transportationChargesHandler(e)}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </label>

                        <label>
                            <p>Installation Charges</p>
                            <input
                                placeholder='(Optional)'
                                value={installationCharges}
                                onChange={(e) => installationChargesHandler(e)}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        </label>

                        <label>
                            <p>Delivery Challan No./ T. Invoice No.</p>
                            <input
                                required
                                type='text'
                                placeholder='(Required)'
                                value={documentNo}
                                onChange={(e) => setDocumentNo(e.target.value)}
                            />
                        </label>

                        <label className="uploadProofBtn">
                            <p>Upload Proof</p>
                            <input type="file"  onChange={handleFileChange} />
                            {file && <p className="fileName">Selected file: {file.name}</p>}
                        </label>
                    </div>

                    <div className='totalPriceDiv'>
                        <p>Total Price :</p>
                        <p>₹ { calculatedTotalPrice.toFixed(2) }</p>
                    </div>

                    <button className='commitTransactionBtn' type='submit'>Commit Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default AddedProducts;

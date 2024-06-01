import React, { useEffect, useState } from 'react';
import "./adminAddedProducts.css";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { calculateTotalPrice, decreaseProductQuantity, deleteFromCart, emptyCart, increaseProductQuantity } from '../../../src/features/cartSlice';
import { commitAdminTransaction, commitStockistTransaction } from '../../../src/features/transactionSlice';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminAddedProducts = () => {

    const { cart, totalPrice } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [installationCharges, setInstallationCharges] = useState("");
    const [transportationCharges, setTransportationCharges] = useState("");
    const [documentNo, setDocumentNo] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    
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
            stockistId: params.id,  
            installationCharges,
            transportationCharges,
            file
        };

        // validations

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



        dispatch(commitAdminTransaction(formData , navigate));
        dispatch(emptyCart())
    };

    
    return (
        <div className='adminAddedProductsBody'>
            <h2 className='adminAddedProductsTitle'>Added Products</h2>

            <div className='adminAddedProductsDetails'>
                {cart.map((item, key) => (
                    item.products.map((product, k) => (
                        <div key={k} className='adminAddedProduct'>
                            <p className='adminAddedProductName'>{product.product.name}</p>
                            <div className='adminAddedProductDetails'>
                                <p className='adminAddedProductPrice'>₹{(product.priceAfterDiscount * product.quantity).toFixed(2)}</p>
                                <div className='adminAddedProductQuantity'>
                                    <input required placeholder='Qnt.'
                                        onKeyPress={(event) => {
                                            if (!/[0-9]/.test(event.key)) {
                                                event.preventDefault();
                                                }
                                            }}
                                    />
                                </div>
                                <p className='adminAddedProductDiscount'>-{product.discount}%</p>
                                <div className='adminAddedProductDeleteParent'>
                                    <button className='adminAddedProductDelete' onClick={() => deleteHandler(product, key)}><MdDelete /></button>
                                </div>
                            </div>
                        </div>
                    ))
                ))}
            </div>

            <div className='cartDetails'>
                <form className='cartDetailsContainer' onSubmit={(e) => { e.preventDefault(); commitTransaction(); }}>

                    <div className='additionalCharges'>
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

export default AdminAddedProducts;

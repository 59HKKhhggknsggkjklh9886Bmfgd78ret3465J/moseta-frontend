import React, { useEffect, useLayoutEffect, useState } from 'react';
import "./adminStockTransfer.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock, fetchStockAdmin, setProductsInStockSlice, setProductsInStockSliceAdmin } from '../../../src/features/stockSlice';
import Loader from '../../Loader/Loader';
import AdminAddedProducts from './AdminAddedProducts';
import AdminCategoryProducts from './AdminCategoryProducts';

const AdminStockTransfer = ({adminNavType, setAdminNavType}) => {

    // fetching from redux store
    const { stock , products } = useSelector((state) => state.stock);
    const {loading} = useSelector((state) => state.transaction);
    const categories = stock.map((i, k) => (i?.name));
    const {accountType} = useSelector((state) => state.user);

    const [selectedAdminCategory, setSelectedAdminCategory] = useState({});

    const dispatch = useDispatch();


    const handleCategoryChange = (e) => {
        setSelectedAdminCategory(e.target.value);
    };
  

    // for setting products
    useEffect(() => {
        dispatch(setProductsInStockSliceAdmin(selectedAdminCategory));
    },[selectedAdminCategory])


    // fetch stock
    useEffect(() => {
        dispatch(fetchStockAdmin());
    },[dispatch,accountType])




    return (
        <div className='adminStockistTransactionBody'>

            {loading ? <Loader/> : null}


            <div className='adminStockistTransactionForm'>

                <div className='adminStockistTransactionTitle'>

                    <h1>STOCK <span>TRANSFER</span></h1>

                </div>

                <div className='adminStockistTransactionProduct adminStockTransferData'>
                    <p>Select Product Category :</p>
                    <select className='adminStockistProductCategories' name="selectedAdminCategory" onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Select Category</option>
                        {stock.map((item, key) => (
                            <option key={key} value={item._id} >{item.name}</option>
                        ))}
                    </select>
                </div>
                
                <div className='adminStockTransferData'>
                    <label  className="adminStockTransferLabel">
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
                    
                <div className='container2'>
                    <AdminCategoryProducts selectedAdminCategory = {selectedAdminCategory} />
                    
                    <AdminAddedProducts/>
                </div>
            </div>
        </div>
    );
};

export default AdminStockTransfer;

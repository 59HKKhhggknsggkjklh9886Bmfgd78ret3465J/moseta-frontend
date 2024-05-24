import React, { useEffect, useLayoutEffect, useState } from 'react';
import "./stockistTransactionPage.css";
import CategoryProducts from './CategoryProducts';
import AddedProducts from './AddedProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock, setProductsInStockSlice } from '../../../src/features/stockSlice';
import { useNavigate } from 'react-router-dom';

const StockistTransactionPage = () => {
    const [client, setClient] = useState("");
    const { stock , products} = useSelector((state) => state.stock);
    const categories = stock.map((i, k) => (i.category));
    
    const [selectedCategory, setSelectedCategory] = useState({});

    const dispatch = useDispatch();
    const {isAuth , accountType} = useSelector((state) => state.user);
    const navigate = useNavigate();

    // console.log(selectedCategory)
    const clientChangeHandler = (e) => {
        setClient(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };



    // for fetching stock
    useEffect(() => {
        dispatch(fetchStock());
    }, [dispatch , selectedCategory]);



    // for setting products
    useEffect(() => {
        dispatch(setProductsInStockSlice(selectedCategory));
    },[selectedCategory])




    return (
        <div className='stockistTransactionBody'>
            <div className='stockistTransactionForm'>
                <div className='stockistTransactionTitle'>
                    <h1>STOCK <span>TRANSFER</span></h1>
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
                </div>

                <div className='stockistTransactionProduct'>
                    <p>Select Product Category :</p>
                    <select className='productCategories' name="selectedCategory" onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map((item, key) => (
                            <option key={key} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='container2'>
                    <CategoryProducts selectedCategory = {selectedCategory} />
                    <AddedProducts />
                </div>
            </div>
        </div>
    );
};

export default StockistTransactionPage;

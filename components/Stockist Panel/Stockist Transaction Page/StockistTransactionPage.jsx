import React, { useEffect, useLayoutEffect, useState } from 'react';
import "./stockistTransactionPage.css";
import CategoryProducts from './CategoryProducts';
import AddedProducts from './AddedProducts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClients, fetchStock, setProductsInStockSlice } from '../../../src/features/stockSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const StockistTransactionPage = ({adminNavType, setAdminNavType}) => {

    // fetching from redux store
    const { stock } = useSelector((state) => state.stock);
    const {selectedClients} = useSelector((state) => state.stock);
    const {loading} = useSelector((state) => state.transaction);
    const {clients , accountType} = useSelector((state) => state.user);
    const categories = stock.map((i, k) => (i.category));
  
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedClient , setSelectedClient] = useState("");
    const [clientType, setClientType] = useState("");

    const dispatch = useDispatch();


    // on client type change
    const clientTypeChange = (e) => {

        setClientType(e.target.value);
        
    }

    const handleCategoryChange = (e) => {
        // console.log(e.target.value)
        setSelectedCategory(e.target.value);
    };


    // for fetching stock
    useEffect(() => {
        dispatch(fetchStock(accountType));
    }, [dispatch , selectedCategory]);



    // for setting products
    useEffect(() => {
        dispatch(setProductsInStockSlice(selectedCategory));
    },[selectedCategory])


    // for fetching clients on client type change
    useEffect(() => {
        dispatch(fetchClients(clients , clientType))
    },[clientType])


    return (
        <div className='stockistTransactionBody'>

            {loading ? <Loader/> : null}


            <div className='stockistTransactionForm'>

                <div className='stockistTransactionTitle'>

                    <h1>STOCK <span>TRANSFER</span></h1>

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

                </div>

                <div className='stockistTransactionProduct'>
                    <div className=''>
                        <p>Clients : </p>
                        <select className='productCategories' onChange={(e) => setSelectedClient(e.target.value)}>
                            <option>Select Client</option>
                            {selectedClients.map((client , key) => (
                            
                                <option key={key} value={client?._id}> {client.name} </option>
                            ))}
                        </select>
                    </div>
                    
                        <div className='stockTransferData'>
                            <label  className="stockTransferLabel">
                                Date
                            </label>
                            <input className='stockTransferDateInput' required type='date'
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                    
                    
                    <p>Select Product Category :</p>
                    <select className='productCategories' name="selectedCategory" onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Select Category</option>
                        {categories.map((item, key) => (
                            <option key={key} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>
                    
                <div className='container2'>
                    <CategoryProducts selectedCategory = {selectedCategory} />
                    
                    <AddedProducts selectedClient={selectedClient}/>
                    
                </div>
            </div>
        </div>
    );
};

export default StockistTransactionPage;

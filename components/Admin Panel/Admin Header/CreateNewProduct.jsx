import React, { useState } from 'react';
import "./createNewProduct.css";
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { createProduct } from '../../../src/features/adminSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const CreateNewProduct = ({ createProductOn, setCreateProductOn }) => {

    const [formData, setFormData] = useState({
        categoryId: '',
        name: '',
        distributorPriceWithoutGst: '',
        retailerPriceWithoutGst: '',
        customerPriceWithoutGst: '',
        mcpWithoutGst: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { stock } = useSelector((state) => state.stock);
    const {loading} = useSelector((state) => state.admin)

    const categoryChange = (e) => {
        setFormData({ ...formData, categoryId: e.target.value });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            !formData.categoryId || 
            !formData.name || 
            !formData.distributorPriceWithoutGst || 
            !formData.retailerPriceWithoutGst || 
            !formData.customerPriceWithoutGst || 
            !formData.mcpWithoutGst
        ){
            toast.error("All fields are required.")
            return
        }

        dispatch(createProduct({formData , navigate}));

        // Reset the form after submission
        setFormData({
            categoryId: '',
            name: '',
            distributorPriceWithoutGst: '',
            retailerPriceWithoutGst: '',
            customerPriceWithoutGst: '',
            mcpWithoutGst: ''
        });
        // Close the modal
        setCreateProductOn(false);
    }

    return (
        <div className={createProductOn ? "createNewProductBody" : "createNewProductBodyOff"}>

            {loading ? <Loader/> : null}

            <div className='createNewProductPopup'>
                <p className='createNewProductTitle'>Create New Product</p>
                <form className='createNewProductForm' onSubmit={handleSubmit}>
                    <div className='createNewProductInnerForm'>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>Category</p>
                            <select className='createCategorySelectInput' onChange={(e) => categoryChange(e)}>
                                <option className='createCategoryOption' value="">Select a category</option>
                                {stock.map((category, index) => (
                                    <option value={category?._id} key={index}> {category?.name} </option>
                                ))}
                            </select>
                        </div>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>Product Name</p>
                            <input
                                required
                                className="createNewProductFormInput"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>Distributor Price Without Gst</p>
                            <input
                                required
                                className="createNewProductFormInput"
                                name="distributorPriceWithoutGst"
                                value={formData.distributorPriceWithoutGst}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>Retailer Price Without Gst</p>
                            <input
                                required
                                className="createNewProductFormInput"
                                name="retailerPriceWithoutGst"
                                value={formData.retailerPriceWithoutGst}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>Customer Price Without Gst</p>
                            <input
                                required
                                className="createNewProductFormInput"
                                name="customerPriceWithoutGst"
                                value={formData.customerPriceWithoutGst}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className='createNewProductFormRow'>
                            <p className='createNewProductCredentialTitle'>MCP Without Gst</p>
                            <input
                                required
                                className="createNewProductFormInput"
                                name="mcpWithoutGst"
                                value={formData.mcpWithoutGst}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className='createNewProductCreateBtn'>
                            <button type="submit">Create</button>
                        </div>
                        <div className='createNewProductCloseBtn'>
                            <button onClick={() => setCreateProductOn(false)} type="button"><MdClose /></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewProduct;

import React, { useState } from 'react';
import "./createNewCategory.css";
import { MdClose } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import { createCategory } from '../../../src/features/adminSlice';

const CreateNewCategory = ({ createCategoryOn, setCreateCategoryOn }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.admin);
    const [passVisible, setPassVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        gst: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can dispatch an action here to store the form data in Redux state or handle it as required.
        
        dispatch(createCategory({formData,navigate}))

        // Reset the form after submission
        setFormData({
            name: '',
            gst: ''
        });
    };

    const togglePasswordVisibility = () => {
        setPassVisible(!passVisible);
    };

    return (
        <div className={createCategoryOn ? "createNewCategoryBody" : "createNewCategoryBodyOff"}>
            {loading ? <Loader/> : null}
            <div className='createNewCategoryPopup'>
                <p className='createNewCategoryTitle'>Create New Category</p> 
                <form className='createNewCategoryForm' onSubmit={handleSubmit}>
                    <div className='createNewCategoryInnerForm'>
                        <div className='createNewCategoryFormRow'>
                            <p className='createNewCategoryCredentialTitle'>Category Name</p>
                            <input 
                                required 
                                className="createNewCategoryFormInput" 
                                type="text" 
                                name="name" 
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='createNewCategoryFormRow'>
                            <p className='createNewCategoryCredentialTitle'>GST</p>
                            <input 
                                required 
                                className="createNewCategoryFormInput" 
                                name="gst" 
                                value={formData.gst}
                                onChange={handleInputChange}
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className='createNewCategoryCreateBtn'>
                            <button type="submit">Create</button>
                        </div>
                        <div className='createNewCategoryCloseBtn'>
                            <button onClick={() => setCreateCategoryOn(false)} type="button"><MdClose/></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewCategory;

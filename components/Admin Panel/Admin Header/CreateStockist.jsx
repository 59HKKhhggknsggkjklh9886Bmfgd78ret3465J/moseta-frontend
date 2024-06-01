import React, { useState } from 'react';
import "./createStockist.css";
import { MdClose } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createStockist } from '../../../src/features/stockistsSlice';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const CreateStockist = ({ createStockistOn, setCreateStockistOn }) => {
    const [passVisible, setPassVisible] = useState(false);
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.stockist);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        special: false,
        expectedProfit: ''
    });

    const togglePasswordVisibility = () => {
        setPassVisible(!passVisible);
        
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const val = type === 'radio' ? (value === 'true') : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: val
        }));
    };

    const submitForm = (e) => {
        e.preventDefault();
    
        dispatch(createStockist(formData , setCreateStockistOn , setFormData));

    };

    return (
        <div className={createStockistOn ? "createStockistBody" : "createStockistBodyOff"}>

            {loading ? <Loader/> : null}

            <div className='createStockistPopup'>

                <p className='createStockistTitle'>Create Stockist</p> 
                
                <form className='createStockistForm' onSubmit={submitForm}>

                    <div className='createStockistInnerForm'>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Stockist Name</p>
                            <input 
                                required 
                                className="createStockistFormInput" 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Stockist Username</p>
                            <input 
                                required 
                                className="createStockistFormInput" 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>GSTIN</p>
                            <input 
                                required 
                                className="createStockistFormInput" 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Stockist Address</p>
                            <input 
                                required 
                                className="createStockistFormInput" 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Stockist Contact</p>
                            <input className='createStockistFormInput'
                                required
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Stockist Trade Name</p>
                            <input 
                                required 
                                className="createStockistFormInput" 
                                type="text" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                        </div>

                        <div className='createStockistFormRow'>
                            <p className='createStockistCredentialTitle'>Password</p>
                                <div className='createStockistPasswordRow'>
                                    <input 
                                        required 
                                        className="createStockistPasswordInput" 
                                        type={passVisible ? "text" : "password"} 
                                        name="password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                    />
                                
                                    <div className='createStockistPasswordEyeParent'>

                                        <div className='createStockistPasswordEye' onClick={togglePasswordVisibility}>
                                            {passVisible ? <FaEye /> : <FaEyeSlash />}
                                        </div>
                                    </div>
                                </div>
                        </div>

                        <div className='createStockistSelectSpecial'>
                            <div className='createStockistSelectSpecialRadioOption'>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="special" 
                                        value="true" 
                                        checked={formData.special === true}
                                        onChange={handleChange} 
                                    />
                                    <p>Special True</p>
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="special" 
                                        value="false" 
                                        checked={formData.special === false}
                                        onChange={handleChange} 
                                    />
                                    <p>Special False</p>
                                </label>
                            </div>
                            {formData.special === true && (
                                <div className='createStockistSpecialTrueExpectedProfit'>
                                    <div className='createStockistFormRow'>
                                        <p className='createStockistCredentialTitle'>Enter Expected Profit</p>
                                        <input 
                                            required 
                                            className="createStockistFormInput" 
                                            type="text" 
                                            name="expectedProfit" 
                                            value={formData.expectedProfit} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='createStockistCreateBtn'>
                            <button type="submit">Create</button>
                        </div>

                        <div className='createStockistCloseBtn'>
                            <button type="button" 
                            onClick={() => {
                                setCreateStockistOn(false) ,
                                setFormData({
                                    name: '',
                                    username: '',
                                    password: '',
                                    special: false,
                                    expectedProfit: ''
                                })
                            }}>

                            <MdClose/>
                            
                            </button>
                        </div>
                    </div>
                </form>
                
            </div>

        </div>
    );
};

export default CreateStockist;













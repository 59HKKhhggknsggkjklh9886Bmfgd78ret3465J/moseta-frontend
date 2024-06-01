import React, { useState } from 'react';
import './createClient.css';
import { MdClose } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from '../../../src/features/stockistsSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const CreateClient = ({ createClientOn, setCreateClientOn }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        contact: '',
        type: '',
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading} = useSelector((state) => state.stockist);

    const [passVisible, setPassVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    // console.log(formData)
    const handleSpecialChange = (value) => {
        setFormData({
            ...formData,
            special: value,
            expectedProfit: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createClient(formData , navigate))
    };

    const passwordIcon = passVisible ? <FaEye /> : <FaEyeSlash />;

    return (
        <div className={createClientOn ? 'createClientBody' : 'createClientBodyOff'}>

            {loading ? <Loader/> : null}

            <div className='createClientPopup'>
                <p className='createClientTitle'>Create Client</p>
                <form className='createClientForm' onSubmit={handleSubmit}>
                    <div className='createClientInnerForm'>

                        <div className='createClientFormRow'>
                            <p className='createClientCredentialTitle'>Client Name</p>
                            <input
                                required
                                className='createClientFormInput'
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='createClientFormRow'>
                            <p className='createClientCredentialTitle'>Client Address</p>
                            <input
                                required
                                className='createClientFormInput'
                                type='text'
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='createClientFormRow'>
                            <p className='createClientCredentialTitle'>Client Contact Number</p>

                            <input required
                                value={formData.contact}
                                onChange={handleChange}
                                className='createClientFormInput'
                                name='contact'
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                    }
                                }}
                            />
                        </div>


                        <div className='createClientSelectSpecial'>
                            <div className='createClientSelectSpecialRadioOption'>

                                <label>
                                    <input
                                        type='radio'
                                        name='type'
                                        value= 'distributor'
                                        onChange={handleChange}
                                    />
                                    <p>Distributor</p>
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        name='type'
                                        value= 'store'
                                        onChange={handleChange}
                                    />
                                    <p>Store</p>
                                </label>
                                <label>
                                    <input
                                        type='radio'
                                        name='type'
                                        value= 'customer'
                                        onChange={handleChange}
                                    />
                                    <p>Customer</p>
                                </label>


                            </div>

                        </div>
                        <div className='createClientCreateBtn'>
                            <button type='submit'>Create</button>
                        </div>
                        <div className='createClientCloseBtn'>
                            <button type='button' onClick={() => setCreateClientOn(false)}>
                                <MdClose />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClient;

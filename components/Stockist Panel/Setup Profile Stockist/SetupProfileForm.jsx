import React, { useState } from 'react';
import "./setupProfileForm.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileByStockist } from '../../../src/features/stockistsSlice';

const SetupProfileForm = () => {
    
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [profilePic, setProfilePic] = useState(user?.profile?.image?.secureUrl || null);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        name: user?.profile?.name || '',
        username: user?.username || '',
        gstNo: user?.profile?.gstNo || '',
        contactNo: user?.profile?.contactNo || '',
        address: user?.profile?.address || '',
        tradeName: user?.profile?.tradeName || '',
    });

    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setProfilePic(URL.createObjectURL(selectedFile));
        setFile(selectedFile);
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (file) {
            data.append('profilePic', file);
        }

        dispatch(updateProfileByStockist(data, user.profileSetup));
    }

    return (
        <div className='setupProfileFormBody'>
            <p className='setupProfileTitle'>SET<span>UP</span> Profile STOCKIST</p>

            <div className='uploadStockistProfilePic'>
                <div>
                    <img className='uploadStockistProfilePicImg' src={profilePic} alt="Profile" />
                </div>
                <label className="custom-file-upload">
                    <input type="file" onChange={handleFileChange} />
                    Upload
                </label>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='formcredentials'>
                    <div>
                        <p>Name</p>
                        <input
                            name="name"
                            required="required"
                            spellCheck="false"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <p>Username</p>
                        <input
                            name="username"
                            required="required"
                            spellCheck="false"
                            type="text"
                            value={formData.username}
                            readOnly
                        />
                    </div>
                </div>
                <div className='formcredentials'>
                    <div>
                        <p>GSTIN</p>
                        <input
                            name="gstNo"
                            required="required"
                            spellCheck="false"
                            type="text"
                            onChange={handleInputChange}
                            value={formData.gstNo}
                        />
                    </div>
                    <div>
                        <p>Contact Number</p>
                        <input
                            name="contactNo"
                            required="required"
                            spellCheck="false"
                            type="text"
                            value={formData.contactNo}
                            onChange={handleInputChange}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                        />
                    </div>
                </div>
                <div className='formcredentials2'>
                    <p>Address</p>
                    <input
                        name="address"
                        required="required"
                        spellCheck="false"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='formcredentials2'>
                    <p>Trade Name</p>
                    <input
                        name="tradeName"
                        required="required"
                        spellCheck="false"
                        type="text"
                        value={formData.tradeName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='setupBtnBody'>
                    <button className='setupBtn' type="submit">Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default SetupProfileForm;

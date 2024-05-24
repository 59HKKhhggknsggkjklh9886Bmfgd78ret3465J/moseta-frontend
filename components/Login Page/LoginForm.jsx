import React, { useState } from 'react';
import "./loginForm.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { login } from '../../src/features/userAuth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setStockistName }) => {
    const [activeClassName, setActiveClassName] = useState(true);
    const [passVisible, setPassVisible] = useState(false);
    const [passtype, setPasstype] = useState(false);
    const [userType , setUserType] = useState("stockist")
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const passwordicon = () => {
        return passVisible ? <FaEye /> : <FaEyeSlash />;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
  
        e.preventDefault();
        // Do something with formData, like sending it to backend or storing it in state
        dispatch(login(formData , navigate , userType))
    };

    return (
        <div className='loginFormBody'>

            <form onSubmit={(e) => handleSubmit(e)} className='loginCredentials'>

                <div className='loginUserType'>
                    <p>User Type :</p>

                    <h1 className={activeClassName ? "loginActiveOption" : "loginInActiveOption"} onClick={() => {
                        setActiveClassName(true);
                        setStockistName(true);
                        setUserType("stockist")
                    }}>STOCKIST</h1>

                    <h1 className={activeClassName ? "loginInActiveOption" : "loginActiveOption"} onClick={() => {
                        setActiveClassName(false);
                        setStockistName(false);
                        setUserType("admin")
                    }}>ADMIN</h1>
                </div>
                <div className='loginNamePass'>
                    <p>Username</p>
                    <input
                        type="text"
                        required="required"
                        spellCheck="false"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className='loginNamePass'>
                    <p>Password</p>
                    <div className='passwordInput'>
                        <input
                            type={passVisible ? "text" : "password"}
                            required="required"
                            spellCheck="false"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                        <div className='passwordEye' onClick={() => {
                            setPassVisible(!passVisible);
                            setPasstype(!passtype);
                        }}>
                            {passwordicon()}
                        </div>
                    </div>
                </div>
                <div className='loginBtnArea'>
                    <button type="submit" className='loginBtn'>
                        <p>Submit</p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

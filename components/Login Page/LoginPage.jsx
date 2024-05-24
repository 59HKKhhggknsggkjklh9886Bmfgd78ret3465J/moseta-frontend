import React, { useEffect, useState } from 'react'
import "./loginPage.css"
import LoginForm from './LoginForm'
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const LoginPage = () => {
    
    const [stockistName, setStockistName] = useState(true)
    const {isAuth , accountType , loading} = useSelector((state) => state.user);
    const navigate = useNavigate();


    // navigation on authentication
    useEffect(() => {

        if(isAuth){
            navigate(`${accountType == 'admin' ? '/admin' : '/stockist' }`);
        }

    },[navigate , accountType , isAuth])

  return (
    <div className='loginPageBody'>

        {loading ? <Loader/> : null}

        <div className='loginPageTitle'>
            <p>Login As</p> 
            <span>
                <p className={stockistName ? "activeName" : "inactiveName"}> STOCKIST</p>
                <p className={stockistName ? "activeName" : "inactiveName"}> ADMIN</p>
            </span>
        </div>
        <div className='loginPageForm'>
            <LoginForm setStockistName = {setStockistName}/>
        </div>

    </div>
  )
}

export default LoginPage
import React from 'react'
import "./StockistHome.css"
import { Link as RouterLink } from 'react-router-dom'
import StokistProfile from './StokistProfile'

const StockistHome = () => {

  return (
    <div className='transactionPageBody'>
        
        <StokistProfile/>

    </div>
  )
}

export default StockistHome
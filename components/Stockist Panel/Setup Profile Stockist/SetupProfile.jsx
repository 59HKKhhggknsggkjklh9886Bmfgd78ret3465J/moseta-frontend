import React from 'react'
import "./setupProfile.css"
import SetupProfileForm from './SetupProfileForm'
import Loader from '../../Loader/Loader'
import { useSelector } from 'react-redux'

const SetupProfile = () => {

  const {loading} = useSelector((state) => state.stockist);

  
  return (
    <div className = "setupProfileBody">
        
        {loading ? <Loader/> : null}
        
        <div className='setupProfileFormParent'>
          <SetupProfileForm/>
        </div>



    </div>
  )
}

export default SetupProfile
import React, { useState } from 'react'
import "./addedProducts.css"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, removeFromCart } from '../../../src/features/cartSlice';
import { increaseQuantityOfProduct } from '../../../src/features/cartSlice';


const AddedProducts = () => {
    const {cart} = useSelector((state)=>state.cart);

    const dispatch = useDispatch();

    const removeData = (e)=>{
        dispatch(removeFromCart(e))
    }

    const increaseData = (e)=>{
        dispatch(increaseQuantityOfProduct(e))
    }

  return (
    <div className='addedProductsBody'>
        <h2 className='addedProductsTitle'>Added Products</h2>

        <div className='addedProductsDetails'>
            {
                cart.map((item,key)=>{
                    return (
                        <div key={key} className='addedProduct'>
                            <p className='addedProductSno'>{key+1}.</p>
                            <p className='addedProductName'>{item.name}</p>
                            <div className='addedProductQuantity'>
                                <p className='addedProductQuantityChangeBtn' onClick={()=>{
                                    removeData(item)
                                }}>-</p>
                                <p className='addedProductQuantityNumber'>{item.qnty}</p>
                                <p className='addedProductQuantityChangeBtn' onClick={()=>{
                                    increaseData(item)
                                }}>+</p>
                            </div>
                            <p className='addedProductPrice'>{item.qnty*item.price}</p>
                            <button className='addedProductDelete' onClick={()=>{deleteFromCart(item)}}><MdDelete /></button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AddedProducts
import React, { useState } from 'react'
import "./addedProducts.css"
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseProductQuantity, deleteFromCart, increaseProductQuantity } from '../../../src/features/cartSlice';


const AddedProducts = () => {

    const {cart} = useSelector((state)=>state.cart);
    const {stock} = useSelector((state)=>state.stock);

    const dispatch = useDispatch();

    const deleteHandler = (product , key) => {
        // console.log(product , k)
        dispatch(deleteFromCart({product , key}))
    }

    const increaseQtyHandler = (product , key) => {
        dispatch(increaseProductQuantity({product, key}))
    }

    const reduceQtyHandler = (product , key) => {
        dispatch(decreaseProductQuantity({product , key}))
    }


  return (
    <div className='addedProductsBody'>
        <h2 className='addedProductsTitle'>Added Products</h2>

        <div className='addedProductsDetails'>
            {
                cart.map((item,key)=>(

                    item.products.map((product , k) => (
                        
                        <div key={k} className='addedProduct'>
                       
                            {/* <p className='addedProductSno'>{ k+1 }.</p>x    */}
                            <p className='addedProductName'>{product.product.name}</p>

                            <div className='addedProductQuantity'>
                                <p className='addedProductQuantityChangeBtn' onClick={()=>{
                                    reduceQtyHandler(product.product , key)
                                }}>-</p>
                                <p className='addedProductQuantityNumber'>{product.quantity}</p>
                                <p className='addedProductQuantityChangeBtn' onClick={()=>{
                                    increaseQtyHandler(product.product , key)
                                }}>+</p>
                            </div>

                            <p className='addedProductPrice'>{product.selectedPrice * product.quantity}</p>

                            <button className='addedProductDelete' onClick={() => deleteHandler(product , key)}><MdDelete /></button>
                        </div>
                    ))

                ))
            }
        </div>
    </div>
  )
}

export default AddedProducts
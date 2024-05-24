import React from 'react'
import "./categoryProducts.css"
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../src/features/cartSlice';
import { useSelector } from 'react-redux';

const CategoryProducts = ({selectedCategory}) => {

  const dispatch = useDispatch();
  const {stock , products} = useSelector((state) => state.stock);

  

  const addData = (e)=>{
    console.log(e)
    // dispatch(addToCart(e))
  }

  return (
    <div className='categoryProductsBody'>
        <h1 className='categoryProductsTitle'>Products</h1>

        <div className='categoryProductsTable'>
            <div className='categoryProductsTableName'>
                <p className='categoryProductsCategorySno'>S.No.</p>
                <p className='categoryProductsCategoryName'>Name</p>
                <p className='categoryProductsCategoryPriceType'>Price Type</p>
            </div>
            <div className='categoryProductsDetails'>
                {
                  products.map((ele, key)=>{
                    return (
                      <div key={key} className='productDetailsParent'>

                          <div className='productDetails'>

                              <p className='productDetailsSno'>{key+1}.</p>
                              <p className='productDetailsName'>{ele.product.name}</p>

                              {/* map for price type */}
                              <select className='productDetailsPriceType' value={ele.selectedPriceType}>
                                <option value="distributor">Distributor Price : {ele.product.distributorPriceWithGst}</option>
                                <option value="retailer">Retailer Price : {ele.product.retailerPriceWithGst}</option>
                                <option value="customer">Customer Price : {ele.product.customerPriceWithGst}</option>
                                <option value="mcp">MCP Price : {ele.product.mcpWithGst}</option>
                              </select>

                          </div>

                          <div className='productDetailsAddBtn' onClick={()=>addData(ele)}>
                            <button><IoIosAdd /></button>
                          </div>
                      </div>
                    )
                  })
                }
            </div>
        </div>
    </div>
  )
}

export default CategoryProducts

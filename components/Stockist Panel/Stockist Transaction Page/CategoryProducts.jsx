import React, { useState } from 'react';
import "./categoryProducts.css";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../src/features/cartSlice';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const CategoryProducts = ({selectedCategory}) => {

  const dispatch = useDispatch();
  const { stock, products } = useSelector((state) => state.stock);
  const [selectedPrice, setSelectedPrice] = useState(""); 
  
  const priceChangeHandler = (e) => {
    const selectedValue = e.target.value;
    setSelectedPrice(selectedValue);
  }

  const addData = (e) => {
    if(selectedPrice === ""){
      toast.error("Please select price type");
      return;
    }
  
    const [priceType, price] = selectedPrice.split(":");
    const itemObj = {
      category: selectedCategory,
      product: e.product,
      quantity: 1,
      selectedPrice: parseFloat(price)
    }

    setSelectedPrice("");
    dispatch(addToCart(itemObj));
  }

  return (
    <div className='categoryProductsBody'>
        <h1 className='categoryProductsTitle'>Products</h1>

        <div className='categoryProductsTable'>
            <div className='categoryProductsTableName'>
                <p className='categoryProductsCategorySno'>S.No.</p>
                <p className='categoryProductsCategoryName'>Name</p>
                <p className='categoryProductsCategoryPriceType'>Price Type</p>
                <p className='categoryProductsCategoryDiscount'>Discount</p>
            </div>
            <div className='categoryProductsDetails'>
                {
                  products.map((ele, key) => {
                    return (
                      <div key={key} className='productDetailsParent'>
                          <div className='productDetails'>
                              <p className='productDetailsSno'>{key+1}.</p>
                              <p className='productDetailsName'>{ele.product.name}</p>

                              {/* map for price type */}
                              <select className='productDetailsPriceType' value={selectedPrice} onChange={(e) => priceChangeHandler(e)}>
                                <option value="">Select Price Type</option>
                                <option value={`distributor:${ele.product.distributorPriceWithGst}`}>Distributor Price : {ele.product.distributorPriceWithGst}</option>
                                <option value={`retailer:${ele.product.retailerPriceWithGst}`}>Retailer Price : {ele.product.retailerPriceWithGst}</option>
                                <option value={`customer:${ele.product.customerPriceWithGst}`}>Customer Price : {ele.product.customerPriceWithGst}</option>
                                <option value={`mcp:${ele.product.mcpWithGst}`}>MCP Price : {ele.product.mcpWithGst}</option>
                              </select>

                              <div className='productDetailsDiscount'>

                                <input className='' type="text" />
                              </div>
                          </div>
                          <div className='productDetailsAddBtn' onClick={() => addData(ele)}>
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

export default CategoryProducts;

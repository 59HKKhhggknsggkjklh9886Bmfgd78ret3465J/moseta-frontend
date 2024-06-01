import React, { useState, useRef, useEffect } from 'react';
import "./adminCategoryProducts.css";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../src/features/cartSlice';
import toast from 'react-hot-toast';

const AdminCategoryProducts = ({ selectedAdminCategory }) => {
  
  const dispatch = useDispatch();
  const { stock, products } = useSelector((state) => state.stock);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [discounts, setDiscounts] = useState(Array(products.length).fill(0)); // Set initial discounts to zero
  const discountRefs = useRef([]);

  const priceChangeHandler = (e) => {
    const selectedValue = e.target.value;
    setSelectedPrice(selectedValue);
  };

  const discountChangeHandler = (index, value) => {
    const newDiscounts = [...discounts];
    newDiscounts[index] = value;
    setDiscounts(newDiscounts);
  };

  const addData = (e, discount, index) => {
    if (selectedPrice === "") {
      toast.error("Please select price type");
      return;
    }
    
    const [priceType, price] = selectedPrice.split(":");

    const itemObj = {
      category: selectedAdminCategory,
      product: e,
      quantity: 1,
      selectedPrice: parseFloat(price),
      discount: parseFloat(discount) || 0 // Ensure discount is a number, default to 0 if not provided
    };

    setSelectedPrice("");

    setDiscounts(prevDiscounts => {
      const newDiscounts = [...prevDiscounts];
      newDiscounts[index] = 0; // Reset discount to zero after adding to cart
      return newDiscounts;
    });

    
    dispatch(addToCart(itemObj));
  };

  // Set initial values for discounts when component mounts
  useEffect(() => {
    setDiscounts(Array(products.length).fill(0));
  }, [products]);

  return (
    <div className='adminCategoryProductsBody'>
      <h1 className='adminCategoryProductsTitle'>Products</h1>

      <div className='adminCategoryProductsTable'>
        
        <div className='adminCategoryProductsTableName'>
          <p className='adminCategoryProductsadminCategorySno'>S.No.</p>
          <p className='adminCategoryProductsadminCategoryName'>Name</p>
          <p className='adminCategoryProductsadminCategoryPriceType'>Price Type</p>
          <p className='adminCategoryProductsadminCategoryDiscount'>Discount</p>
        </div>

        <div className='adminCategoryProductsDetails'>
          {products.map((ele, key) => {
            return (
              <div key={key} className='adminCategoryProductDetailsParent'>
                
                <div className='adminCategoryProductTopDetails'>              
                  <div className='adminCategoryProductDetails'>
                    <p className='adminCategoryProductDetailsSno'>{key + 1}.</p>
                    <p className='adminCategoryProductDetailsName'>{ele.name}</p>

                    <select
                      className='adminCategoryProductDetailsPriceType'
                      value={selectedPrice}
                      onChange={(e) => priceChangeHandler(e)}
                    >
                      <option value="">Select Price Type</option>
                      <option value={`distributor:${ele.distributorPriceWithGst}`}>Distributor Price :  ₹{ele.distributorPriceWithGst}</option>
                      <option value={`retailer:${ele.retailerPriceWithGst}`}>Retailer Price :  ₹{ele.retailerPriceWithGst}</option>
                      <option value={`customer:${ele.customerPriceWithGst}`}>Customer Price :  ₹{ele.customerPriceWithGst}</option>
                      <option value={`mcp:${ele.mcpWithGst}`}>MCP Price :  ₹{ele.mcpWithGst}</option>
                    </select>

                    <p className='adminCategoryDiscountInput'>
                      <input
                        placeholder='- %'
                        required
                        ref={(el) => discountRefs.current[key] = el}
                        value={discounts[key]}
                        onChange={(e) => discountChangeHandler(key, e.target.value)}
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        }}
                        onInput={(event) => {
                          if (event.target.value > 100) {
                            event.target.value = 100;
                          }
                        }}
                      />
                    </p>
                  </div>
                </div>
                
                <div className='adminCategoryProductDetailsAddBtn'>
                  <button onClick={() => addData(ele, discounts[key], key)}><IoIosAdd /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminCategoryProducts;

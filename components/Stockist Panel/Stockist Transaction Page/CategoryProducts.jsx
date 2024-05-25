import React, { useState, useRef, useEffect } from 'react';
import "./categoryProducts.css";
import { IoIosAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../src/features/cartSlice';
import toast from 'react-hot-toast';

const CategoryProducts = ({ selectedCategory }) => {
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
      category: selectedCategory,
      product: e.product,
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
    console.log(itemObj);
    dispatch(addToCart(itemObj));
  };

  // Set initial values for discounts when component mounts
  useEffect(() => {
    setDiscounts(Array(products.length).fill(0));
  }, [products]);

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
          {products.map((ele, key) => {
            return (
              <div key={key} className='productDetailsParent'>
                <div className='productDetails'>
                  <p className='productDetailsSno'>{key + 1}.</p>
                  <p className='productDetailsName'>{ele.product.name}</p>

                  <select
                    className='productDetailsPriceType'
                    value={selectedPrice}
                    onChange={(e) => priceChangeHandler(e)}
                  >
                    <option value="">Select Price Type</option>
                    <option value={`distributor:${ele.product.distributorPriceWithGst}`}>Distributor Price :  ₹{ele.product.distributorPriceWithGst}</option>
                    <option value={`retailer:${ele.product.retailerPriceWithGst}`}>Retailer Price :  ₹{ele.product.retailerPriceWithGst}</option>
                    <option value={`customer:${ele.product.customerPriceWithGst}`}>Customer Price :  ₹{ele.product.customerPriceWithGst}</option>
                    <option value={`mcp:${ele.product.mcpWithGst}`}>MCP Price :  ₹{ele.product.mcpWithGst}</option>
                  </select>

                  <p className='discountInput'>
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

                <div className='productDetailsAddBtn' onClick={() => addData(ele, discounts[key], key)}>
                  <button><IoIosAdd /></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts;

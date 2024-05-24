import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cslice",
    initialState,
    reducers: {

        // add to cart
        addToCart:(state,action)=>{
               
            const { category, product, quantity, selectedPrice } = action.payload;
         

            const isCategoryIncluded = state.cart.some(item => item.category === category );
            
            // if category not exist
            if (!isCategoryIncluded) {
                const objToPush = {
                    category: category,
                    products: [{ product, quantity, selectedPrice }]
                }
                state.cart.push(objToPush);
            }

            // if category exists
            if (isCategoryIncluded) {
                const categoryIndex = state.cart.findIndex(item => item.category === category);
                
                // if product not exist in the category then add it
                const productIndex = state.cart[categoryIndex].products.findIndex(item => item.product.name === product.name);
                if (productIndex === -1) {
                    state.cart[categoryIndex].products.push({ product, quantity, selectedPrice });
                } else {
                    // if product exist in category then replace it because selected price can be different
                    state.cart[categoryIndex].products[productIndex] = { product, quantity, selectedPrice };
                }
            }
        },



        // delete from cart
        deleteFromCart: (state, action) => {
            const { product, key } = action.payload;
            
            // Check if the key is within the bounds of the cart array
            if (key >= 0 && key < state.cart.length) {
            
                // Get the category object at the specified index
                const categoryObj = state.cart[key];
                
                // Find the index of the product within the category's products array
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.product.name);
        
                // If the product is found, remove it from the category's products array
                if (productIndex !== -1) {
                    
                    categoryObj.products.splice(productIndex, 1);
                    
                    // If the products array becomes empty after removal, remove the entire category object
                    if (categoryObj.products.length === 0) {
                        state.cart.splice(key, 1);
                    }
                }
            }
        },


        // increase quantity
        increaseProductQuantity: (state, action) => {
            const { product, key } = action.payload;
        
            // Check if the key is within the bounds of the cart array
            if (key >= 0 && key < state.cart.length) {
                // Get the category object at the specified index
                const categoryObj = state.cart[key];
                
                // Find the index of the product within the category's products array
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.name);
        
                // If the product is found, increase its quantity
                if (productIndex !== -1) {
                    categoryObj.products[productIndex].quantity += 1;
                }
            }
        },
        
        

        // decrease quantity
        decreaseProductQuantity: (state, action) => {
            const { product, key } = action.payload;
        
            // Check if the key is within the bounds of the cart array
            if (key >= 0 && key < state.cart.length) {
                // Get the category object at the specified index
                const categoryObj = state.cart[key];
                
                // Find the index of the product within the category's products array
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.name);
        
                // If the product is found and its quantity is greater than 1, decrease its quantity
                if (productIndex !== -1 && categoryObj.products[productIndex].quantity > 1) {
                    categoryObj.products[productIndex].quantity -= 1;
                }
            }
        },
        
    }
});

export const { addToCart , deleteFromCart , increaseProductQuantity , decreaseProductQuantity} = cartSlice.actions;
export default cartSlice.reducer;

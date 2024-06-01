import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalPrice: 0,
    
}

const cartSlice = createSlice({
    name: "cslice",
    initialState,
    reducers: {
        // add to cart
        addToCart: (state, action) => {
            const { category, product, quantity, selectedPrice, discount } = action.payload;

            const priceBeforeDiscount = selectedPrice;
            const priceAfterDiscount = priceBeforeDiscount - (priceBeforeDiscount * (discount / 100));

            const isCategoryIncluded = state.cart.some(item => item.category === category );

            if (!isCategoryIncluded) {
                const objToPush = {
                    category: category,
                    products: [{ product, quantity, priceBeforeDiscount , priceAfterDiscount , discount }]
                }
                state.cart.push(objToPush);
            } else {
                const categoryIndex = state.cart.findIndex(item => item.category === category);
                const productIndex = state.cart[categoryIndex].products.findIndex(item => item.product.name === product.name);

                if (productIndex === -1) {
                    state.cart[categoryIndex].products.push({ product, quantity, priceBeforeDiscount, priceAfterDiscount, discount });
                } else {
                    state.cart[categoryIndex].products[productIndex] = { product, quantity, priceBeforeDiscount, priceAfterDiscount, discount };
                }
            }
            
            state.totalPrice = calculateTotalPrice(state.cart);
        },

        // delete from cart
        deleteFromCart: (state, action) => {
            const { product, key } = action.payload;

            if (key >= 0 && key < state.cart.length) {
                const categoryObj = state.cart[key];
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.product.name);
        
                if (productIndex !== -1) {
                    categoryObj.products.splice(productIndex, 1);
                    if (categoryObj.products.length === 0) {
                        state.cart.splice(key, 1);
                    }
                }
            }

            state.totalPrice = calculateTotalPrice(state.cart);
        },

        // increase quantity
        increaseProductQuantity: (state, action) => {
            const { product, key } = action.payload;

            if (key >= 0 && key < state.cart.length) {
                const categoryObj = state.cart[key];
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.name);

                if (productIndex !== -1) {
                    categoryObj.products[productIndex].quantity += 1;
                }
            }

            state.totalPrice = calculateTotalPrice(state.cart);
        },

        // decrease quantity
        decreaseProductQuantity: (state, action) => {
            const { product, key } = action.payload;

            if (key >= 0 && key < state.cart.length) {
                const categoryObj = state.cart[key];
                const productIndex = categoryObj.products.findIndex(item => item.product.name === product.name);

                if (productIndex !== -1 && categoryObj.products[productIndex].quantity > 1) {
                    categoryObj.products[productIndex].quantity -= 1;
                }
            }

            state.totalPrice = calculateTotalPrice(state.cart);
        },

        // set cart empty
        emptyCart: (state , action) => {
            state.cart = []
            state.totalPrice = 0;
        }
    }
});



// Helper function to calculate total price
export const calculateTotalPrice = (cart) => {
    
    let totalPrice = 0;
    cart.forEach(category => {
        category.products.forEach(product => {
            totalPrice += product.priceAfterDiscount * product.quantity;
        });
    });

    return totalPrice;
};



export const { 
    addToCart, 
    deleteFromCart, 
    increaseProductQuantity, 
    decreaseProductQuantity ,
    emptyCart
    } = cartSlice.actions;
export default cartSlice.reducer;

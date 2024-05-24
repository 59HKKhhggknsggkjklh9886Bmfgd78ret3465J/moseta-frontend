import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]
}

const cartSlice = createSlice({
    name:"cslice",
    initialState,
    reducers:{
        
        // increase quantity of product in cart
        increaseQuantityOfProduct:(state,action)=>{
            const itemIndexDel = state.carts.findIndex((item)=>item.name === action.payload.name)

            state.carts[itemIndexDel].qnty += 1;
            console.log("hello")
        },


        // add to cart
        addToCart:(state,action)=>{
            let present = false;
            let idx = 0;
            for (idx = 0 ; idx < state.carts.length ; idx++)
            {
                if (state.carts[idx].name === action.payload.name)
                {
                    present = true;
                }    
            }
            if (present === false)
            {
                let temp = {...action.payload, qnty:1}
                state.carts = [...state.carts, temp]
            }
        },

        // remove from cart
        removeFromCart:(state,action)=>{
            const itemIndexDel = state.carts.findIndex((item)=>item.name === action.payload.name)

            state.carts[itemIndexDel].qnty -= 1;

            // if (state.carts[itemIndexDel].qnty <= 0)
            // {
            //     const data = state.carts.filter((item)=> item.name != action.payload.name)
            //     state.carts = data;
            // }
        },

        // delete from cart
        deleteFromCart:(state,action)=>{
            const itemIndexDel = state.carts.findIndex((item)=>item.name === action.payload.name)

            state.carts[itemIndexDel].qnty += 1;
            console.log("hello")
        }
    }
});

export const {increaseQuantityOfProduct, addToCart, removeFromCart, deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{
        addToCart(state,action){
            const existing=state.cart.find(item=>item.id==action.payload.id)
            if(existing){
                existing.quantity +=1
                // alert("added product")
            }else{
                let prod=action.payload
                prod={...prod,quantity:1}
                state.cart.push(prod)
                // alert("product")
                
            }
        },
        removeCart(state,action){
           state.cart= state.cart.filter(item=>item.id!=action.payload.id)
        },
        increaseQuantiy(state,action){
            const existing=state.cart.find(item=>item.id==action.payload)
            existing.quantity++            
            
        },
        decreaseQuantiy(state,action){
            const existing=state.cart.find(item=>item?.id==action.payload)            
            if(existing.quantity==1){
                state.cart= state.cart.filter(item=>item.id!=action.payload)

            }else{
                existing.quantity--

            }
        },
        checkout(state,action){
            state.cart=[]
        }

    }
})

export default cartSlice.reducer
export const {addToCart,removeCart,increaseQuantiy,decreaseQuantiy,checkout}=cartSlice.actions
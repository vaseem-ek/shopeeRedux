import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const wishListSlice=createSlice({
    name:"wishlist",
    initialState:{
        wish:[]
    },
    reducers:{
        addWish(state,action){
            const existing=state.wish.find(item=>item.id==action.payload.id)
            if(existing){
                toast.success("product alredy added to wish list")
            }else{
                state.wish.push(action.payload)
                toast.success("product added to wish list")
            }
        },
        removeWish(state,action){
            state.wish=state.wish.filter(item=>item.id!=action.payload.id)
            // alert("product removed")
        }
    }
})

export default wishListSlice.reducer
export const {addWish,removeWish}=wishListSlice.actions
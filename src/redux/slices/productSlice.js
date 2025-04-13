import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncThunck = createAsyncThunk('product/fetchAsyncThunck', async () => {
    const response = await axios.get('https://dummyjson.com/products')
    localStorage.setItem('product',JSON.stringify(response.data.products))
    return response.data.products
})

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: [],
        loading: false,
        error: "",
        currentPage:1,
        producePerPage:10
    },
    reducers: {
        nextPage(state){
            state.currentPage++
        },
        prevPage(state){
            state.currentPage--
        },
        search(state,action){
          state.product= state.product.filter(item=>item.title.toLowerCase().includes(action.payload.toLowerCase()))          
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncThunck.fulfilled, (state, action) => {
            state.product = action.payload
            state.loading = false
        }),
            builder.addCase(fetchAsyncThunck.pending, (state, action) => {
                state.product = []
                state.loading = true
            }),
            builder.addCase(fetchAsyncThunck.rejected, (state, action) => {
                state.product = []
                state.loading = false
                state.error = "api fetching failed"

            })

    }
})

export default productSlice.reducer
export const {nextPage,prevPage,search}=productSlice.actions
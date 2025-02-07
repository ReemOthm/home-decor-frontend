import { notifySuccess } from '@/Toastify'
import { createSlice } from '@reduxjs/toolkit'

import { CartState } from '@/types'

const data = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart") as string) : null;

const initialState: CartState = {
    cartProducts: data || [],
    totalPrice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state,action)=>{
            const existsItem = Object.assign({},state.cartProducts.find(item=>item.productId === action.payload.productId))
            if(!(Object.keys(existsItem).length === 0 && existsItem.constructor === Object)){
                state.cartProducts.map((item,index)=>{
                    if(item.productId === action.payload.productId){
                        const totalPrice = action.payload.price * (item.quantity + action.payload.quantity)
                        state.cartProducts[index] = {...item, quantity: item.quantity + action.payload.quantity, price: totalPrice}
                    }
                })
            } else{
                state.cartProducts.push(action.payload)
            }
            notifySuccess("Product Added to Cart")
            state. totalPrice = state.cartProducts.reduce((accumulator , current)=> accumulator + current.price,0)
            localStorage.setItem("cart", JSON.stringify(state.cartProducts))
        },
        deleteItem: (state, action)=>{
            state.cartProducts = state.cartProducts.filter(item => item.productId !== action.payload)
            state. totalPrice = state.cartProducts.reduce((accumulator , current)=> accumulator + current.price,0)
        },
        resetCart: (state)=>{
            state.cartProducts = []
        }
    },
})

export const { addToCart, deleteItem, resetCart } = cartSlice.actions
export default cartSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { notifyError, notifyLoading, notifySuccess } from "@/Toastify";
import { CartItem, OrderState } from "@/types";

const initialState: OrderState ={
    orders: [],
    totalPages: 1,
    error: null ,
    isLoading: false,
};

export const fetchOrders = createAsyncThunk("/orders", async () => {
    const user = JSON.parse(localStorage.getItem('loginData') as string).isAdmin
    let url;
    if(user) url= `/orders` 
    else url = '/orders/my-orders'
    try {
        const response = await api.get(url);
        return response.data.data;
    } catch (error) {
        throw new Error('Failed to fetch orders');
    }
});

export const createOrder = createAsyncThunk("/orders/create", async ({items, amount}:{items:CartItem, amount:number}) => {
    await api.post(`/orders?amount=${amount.toString()}`, items);
});

export const updateOrder = createAsyncThunk("/orders/update", async ({orderId, status}:{orderId:string, status:number}) => {
    await api.put(`/orders/${orderId}`, {status});
    return {orderId, status}
});
    
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'No Orders Found';
        });
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
            notifyLoading("Please wait....")
        });
        builder.addCase(createOrder.fulfilled, (state) => {
            state.isLoading = false;
            toast.dismiss()
            notifySuccess("Order Added Successfully!")
        });
        builder.addCase(createOrder.rejected, (state, action) => {
            toast.dismiss()
            state.isLoading = false;
            state.error = action.error.message || 'An Error Accoure';
            notifyError(state.error)
        });
        builder.addCase(updateOrder.pending, () => {
            notifyLoading("Please wait....")
        });
        builder.addCase(updateOrder.fulfilled, (state,action) => {
            toast.dismiss()
            notifySuccess("Order has Updated Successfully!")
            state.orders.map(order=>{
                if(order.orderId == action.payload.orderId){
                    order.status = action.payload.status.toString()
                }
            })
        });
        builder.addCase(updateOrder.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || 'No Order Found';
            notifyError(state.error)
        });
    }
});

export default orderSlice.reducer;
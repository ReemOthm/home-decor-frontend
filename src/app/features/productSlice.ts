import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Product, productParams, ProductState } from "@/types";
import { notifyError, notifyLoading, notifySuccess } from "@/Toastify";

const initialState: ProductState ={
    products: [],
    totalPages: 1,
    error: null ,
    isLoading: false,
};

export const fetchProducts = createAsyncThunk("products", async (params:productParams, {rejectWithValue}) => {
    const {category, searchKeyword, minPrice, maxPrice, pageNumber} = params
    const queryParameters = new URLSearchParams();
    if(searchKeyword) queryParameters.append('keyword', searchKeyword)
    if(category) queryParameters.append('category', category)
    if(minPrice) queryParameters.append('minPrice', minPrice)
    if(maxPrice) queryParameters.append('maxPrice', maxPrice)
    if(pageNumber) queryParameters.append('page', pageNumber)
    const url = `/products?${queryParameters.toString()}&pageSize=8`
    try {
        const response = await api.get(url);
        return response.data;
    } catch (error) {
        rejectWithValue('Failed to fetch users');
    }
});
    
export const createProduct = createAsyncThunk("products/create", async (product:Product) => {
    const response = await api.post(`/products`, product)
    const productData = {...product,  productID:response.data.data}
    return productData
});

export const updateProduct = createAsyncThunk("/product/update", async (updatedProduct:Product) => {
    await api.put(`/products/${updatedProduct.productID}`, updatedProduct)
    return updatedProduct;
});

export const deleteProduct = createAsyncThunk(`/products?productId`, async (productId: string) => {
    await api.delete(`/products/${productId}`)
    return productId;
});

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload.items;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'No Users Found';
        });
        builder.addCase(createProduct.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            toast.dismiss()
            state.products.unshift(action.payload)
            notifySuccess("Product has added Successfully!")
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('An Error Accure')
        });
        builder.addCase(updateProduct.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            toast.dismiss()
            state.products.map(product=>{
                if(product.productID == action.payload.productID){
                    product.productName = action.payload.productName
                    product.description = action.payload.description
                    product.image = action.payload.image
                    product.categoryName = action.payload.categoryName
                    product.color = action.payload.color
                    product.price = action.payload.price
                }
            })
            notifySuccess("Product has updated Successfully!")
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('An Error Accure')
        });
        builder.addCase(deleteProduct.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((product:Product) => product.productID !== action.payload);
            toast.dismiss()
            notifySuccess("Product has deleted Successfully!")
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('Error while deleting the user!')
        });
    }
});

export default productSlice.reducer;
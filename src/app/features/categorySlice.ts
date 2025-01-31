import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { notifyError, notifyLoading, notifySuccess } from "@/Toastify";
import { Category, CategoryState } from "@/types";

const initialState: CategoryState ={
    categories: [],
    totalPages: 1,
    error: null ,
    isLoading: false,
};

export const fetchCategories = createAsyncThunk("/categories", async (slug:string, {rejectWithValue}) => {
    try {
        const response = await api.get(`/categories/${slug}`);
        return response.data;
    } catch (error) {
        rejectWithValue('Failed to fetch categories');
    }
});

export const fetchCategoriesAll = createAsyncThunk("/categories/all", async (pageNumber:string, {rejectWithValue}) => {
    const queryParameters = new URLSearchParams();
    if(pageNumber) queryParameters.append('pageNumber', pageNumber)
    const url = `/categories/all?${queryParameters.toString()}&pageSize=6`
    try {
        const response = await api.get(url);
        return response.data.data;
    } catch (error) {
        rejectWithValue('Failed to fetch categories');
    }
});

export const createCategory = createAsyncThunk("/categories/create", async (category: {name:string, description:string}) => {
    await api.post("/categories", category);
});

export const updateCategory = createAsyncThunk("/categories/update", async (category:Category) => {
    await api.put(`/categories/${category.categoryID}`, category);
    return category
});

export const deleteCategory = createAsyncThunk(`/categories/delete`, async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`)
    return categoryId;
});
    
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.data;
            state.totalPages = action.payload.data.length;
        });
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'No Categories Found';
        });
        builder.addCase(fetchCategoriesAll.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCategoriesAll.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload.items;
            state.totalPages = action.payload.totalPages;
        });
        builder.addCase(fetchCategoriesAll.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'No Categories Found';
        });
        builder.addCase(createCategory.pending, (state) => {
            state.isLoading = true;
            notifyLoading("Please wait....")
        });
        builder.addCase(createCategory.fulfilled, (state) => {
            state.isLoading = false;
            toast.dismiss()
            notifySuccess("Category Added Successfully!")
        });
        builder.addCase(createCategory.rejected, (state, action) => {
            toast.dismiss()
            state.isLoading = false;
            state.error = action.error.message || 'No Categories Found';
            notifyError(state.error)
        });
        builder.addCase(updateCategory.pending, (state) => {
            state.isLoading = true;
            notifyLoading("Please wait....")
        });
        builder.addCase(updateCategory.fulfilled, (state,action) => {
            state.isLoading = false;
            toast.dismiss()
            notifySuccess("Category has Updated Successfully!")
            state.categories.map(category=>{
                if(category.categoryID == action.payload.categoryID){
                    category.name = action.payload.name
                    category.description = action.payload.description
                }
            })
        });
        builder.addCase(updateCategory.rejected, (state, action) => {
            toast.dismiss()
            state.isLoading = false;
            state.error = action.error.message || 'No Categories Found';
            notifyError(state.error)
        });
        builder.addCase(deleteCategory.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.categories = state.categories.filter((category:Category) => category.categoryID !== action.payload);
            toast.dismiss()
            notifySuccess("Category has deleted Successfully!")
        });
        builder.addCase(deleteCategory.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('Error while deleting the category!')
        });
    }
});

export default categorySlice.reducer;
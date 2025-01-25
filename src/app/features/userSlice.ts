import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { LoginInput, UserState, FormInput, User } from "@/types";
import { notifyError, notifyLoading, notifySuccess } from "@/Toastify";

const data = localStorage.getItem("loginData") ? JSON.parse(localStorage.getItem("loginData") as string) : null;

const initialState: UserState = data || {
    error: null,
    isLoading: false,
    token: null,
    isLoggedIn: false,
    isAdmin: false,
    userData: null,
    users: [],
    totalPages: 1,
};

export const registerUser = createAsyncThunk("/users/signup", async (newUser: FormInput) => {
    const response = await api.post("/users/signup", newUser);
    return response.status;
});

export const loginUser = createAsyncThunk("api/login", async (userData: LoginInput) => {
    const response = await api.post("/api/login", userData);
    return response.data;
});

export const updateUserProfile = createAsyncThunk("/users/profile", async (name:{firstName: string | undefined; lastName: string | undefined;}) => {
    const response = await api.put("/users/profile", name);
    return response.data;
});

export const fetchUsers = createAsyncThunk("/users", async (searchTerm:string) => {
    try {
        const queryParameters = new URLSearchParams();
        if (searchTerm) {
            queryParameters.append('pageNumber', searchTerm);
        }
        const response = await api.get(`/users?${queryParameters.toString()}&pageSize=6`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
});

export const banUser = createAsyncThunk("/users/ban-unban", async (userId: string) => {
    await api.put(`/users/ban-unban?userIdString=${userId}`)
    return userId;
});

export const deleteUser = createAsyncThunk(`/users?userId`, async (userId: string) => {
    await api.delete(`/users?userId=${userId}`)
    return userId;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
            state.token = null;
            state.isAdmin = false;
            localStorage.removeItem("cart");//remove
            localStorage.removeItem("loginData");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(registerUser.fulfilled, () => {
            toast.dismiss()
            notifySuccess("Register Successfully!")
        });
        builder.addCase(registerUser.rejected, () => {
            toast.dismiss()
            notifyError("Register Failed!")
        });
        builder.addCase(loginUser.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            toast.dismiss()
            state.isLoggedIn = true;
            state.userData = action.payload.data;
            state.token = action.payload.token;
            state.isAdmin = action.payload.data.isAdmin;
            localStorage.setItem("loginData", JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                token: state.token,
                isAdmin: action.payload.data.isAdmin,
                userData: state.userData,
            }));
            notifySuccess("Login Successfully!")
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null
            state.error? notifyError(state.error) : notifyError("Failed to Login")
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            console.log(action.payload)
            state.userData = action.payload.data
            localStorage.setItem("loginData", JSON.stringify({
                isLoggedIn: state.isLoggedIn,
                token: state.token,
                userData: state.userData,
            }));
        });
        builder.addCase(fetchUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload.data.items;
            state.totalPages = action.payload.data.totalPages;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'No Users Found';
        });
        builder.addCase(banUser.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(banUser.fulfilled, (state,action) => {
            toast.dismiss()
            state.users.map((user:User) => {
                user.userID == action.payload ? user.isBanned = !user.isBanned : user.isBanned
            });
            notifySuccess("User has updated Successfully!")
        });
        builder.addCase(banUser.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('An Error Accure')
        });
        builder.addCase(deleteUser.pending, () => {
            notifyLoading("Please wait...")
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user:User) => user.userID !== action.payload);
            toast.dismiss()
            notifySuccess("User has deleted Successfully!")
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            toast.dismiss()
            state.error = action.error.message || null;
            state.error? notifyError(state.error) : notifyError('Error while deleting the user!')
        });
    }
});

export const { logoutUser , setLoading, setToken} = userSlice.actions;
export default userSlice.reducer;
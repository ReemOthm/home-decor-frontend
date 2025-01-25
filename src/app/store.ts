import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer: {
        userReducer,
        cartReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
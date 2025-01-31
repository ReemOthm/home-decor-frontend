import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './features/cartSlice'
import userReducer from './features/userSlice'
import productRoducer from './features/productSlice'
import categoryRoducer from './features/categorySlice'

export const store = configureStore({
    reducer: {
        userReducer,
        productRoducer,
        categoryRoducer,
        cartReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
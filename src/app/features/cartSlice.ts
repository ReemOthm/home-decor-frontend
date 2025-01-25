import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
})

// export const {  } = cartSlice.actions

export default cartSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState = {
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
})

// export const {  } = productsSlice.actions

export default productsSlice.reducer
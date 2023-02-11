import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface userState {
    open: boolean
}


const initialState: userState = {
    open: true
}

export const sideBarSlice = createSlice({
    name: "open",
    initialState,
    reducers: {
        trueOpen: (state) => {
            state.open = true
        },
        falseOpen: (state) => {
            state.open = false
        },
    }, 
})


export const { trueOpen, falseOpen } = sideBarSlice.actions
export default sideBarSlice.reducer
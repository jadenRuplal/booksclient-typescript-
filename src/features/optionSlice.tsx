import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface userState {
    value: Option[]
}

interface Option {
    options: [
        option: {
            name: string,
            display_name: string,
        }
    ] | null
}


const initialState: userState = {
    value: []
}

export const optionSlice = createSlice({
    name: "options",
    initialState,
    reducers: {
        addOption: (state, action: PayloadAction<Option>) => {
            state.value.push(action.payload)
        },
        clearOption: (state) => {
            state.value=[]
        }
        
    }, 
})


export const { addOption, clearOption } = optionSlice.actions
export default optionSlice.reducer
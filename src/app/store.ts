import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import optionReducer from '../features/optionSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        option: optionReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
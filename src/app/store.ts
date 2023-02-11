import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/userSlice"
import optionReducer from '../features/optionSlice'
import snackbarReducer from '../features/snackSlice'
import sideBarReducer from '../features/sideBarSlice'



export const store = configureStore({
    reducer: {
        user: userReducer,
        option: optionReducer,
        snackbar: snackbarReducer,
        sideBar: sideBarReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
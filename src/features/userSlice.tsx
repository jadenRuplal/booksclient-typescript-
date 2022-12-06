import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface userState {
    value: User[]
}

interface User {
    user: {
        sessions: [{
            session_id: number,
            id: string,
        }]
        email: string,
} | null
}


const initialState: userState = {
    value: []
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.value.push(action.payload)
        },
        
    }, 
})


export const { addUser } = userSlice.actions
export default userSlice.reducer
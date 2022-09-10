import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        id: '',
        name: '',
        avatar: 'https://i.etsystatic.com/21689229/r/il/bce321/2406492170/il_570xN.2406492170_dgxu.jpg',
        loggedIn: false,
        user_metadata: {},
    },
}

// TODO: add asyncThunk for upload to supabase

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user.id = action.payload.id
            state.user.loggedIn = true
            console.log('🚀 ~ file: userSlice.js ~ line 21 ~ action.payload.id', action.payload.id)
        },
        reset: () => initialState,
    },
})

export const { loginUser, reset } = userSlice.actions

export default userSlice.reducer

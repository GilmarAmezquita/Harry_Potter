import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            uid: '',
            username: '',
            email: '',
            phone: '',
            jwt: '',
            authProvider: ''
        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = {
                uid: '',
                username: '',
                email: '',
                phone: '',
                jwt: '',
                authProvider: ''
            };
        },
    },
});

export const { login, logout  } = authSlice.actions;

export default authSlice.reducer;

export interface userProps {
    uid: string,
    username: string,
    email: string,
    phone: string,
    jwt: string,
    authProvider: string
} 
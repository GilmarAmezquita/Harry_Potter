import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            uid: '',
            name: '',
            email: '',
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
                name: '',
                email: '',
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
    name: string,
    email: string,
    jwt: string,
    authProvider: string
} 
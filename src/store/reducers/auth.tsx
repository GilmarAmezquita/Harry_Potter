import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: {
            name: '',
            email: '',
            jwt: '',

        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = {
                name: '',
                email: '',
                jwt: '',
            };
        },
    },
});

export const { login, logout  } = authSlice.actions;

export default authSlice.reducer;
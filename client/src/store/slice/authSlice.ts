import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name: "auth",
    initialState: <AuthState>{
        isAuthenticated: false,
        user: {
            name: "",
            email: "",
        },
    },
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        removeUseer: (state: AuthState) => {
            state.isAuthenticated = false;
            state.user = {
                name: "",
                email: "",
            };
        },
    },
});

export const { setUser:setAuth, removeUseer } = auth.actions;
export default auth.reducer;

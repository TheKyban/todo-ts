import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

const Store = configureStore({
    reducer: {
        auth: authSlice,
    },
});
export type storeType = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch

export default Store;

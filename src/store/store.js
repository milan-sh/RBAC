import { configureStore } from "@reduxjs/toolkit";
import roleReducer  from "./RoleSlice";

export const store = configureStore({
    reducer : {
        roles: roleReducer,
    }
})
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice"; // ✅ Import the new slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer, // ✅ Add product reducer
  },
});

export default store;

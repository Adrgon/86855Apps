const { configureStore } = require("@reduxjs/toolkit");
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "../features/Counter/counterSlice"
import shopReducer from "../features/Shop/shopSlice"
import cartReducer from "../features/Cart/cartSlice"
import { shopApi } from "../services/shopServices";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shopApi.middleware)
});

setupListeners(store.dispatch);

export default store;

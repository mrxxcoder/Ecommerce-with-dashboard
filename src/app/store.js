import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import loginSlice from "./features/loginSlice";
import cartSlice from "./features/cartSlice";
import globalSlice from "./features/globalSlice";
import { apiSlice } from "./services/apiSlice";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, cartSlice);

export const store = configureStore({
  reducer: {
    login: loginSlice,
    cart: persistedCart,
    global: globalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      apiSlice.middleware,
    ]),
});

export const persistor = persistStore(store);

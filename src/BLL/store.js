import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from "./wishlistSlice";
import accountSlice from "./accountSlice";
import giftcardReducer from "./giftcardSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistSlice,
    account: accountSlice,
    giftcard: giftcardReducer,
  },
});
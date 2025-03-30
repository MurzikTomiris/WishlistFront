import { createSlice } from "@reduxjs/toolkit";
import {
  getAllWishlistsThunk,
  getWishlistByAccountIdThunk,
  getWishlistByIdThunk,
  createWishlistThunk,
  updateWishlistThunk,
  deleteWishlistThunk,
  deactivateWishlistThunk,
} from "../DAL/WishlistThunk";

const initialState = {
  wishlists: [],
  currentWishlist: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    resetCurrentWishlist(state) {
      state.currentWishlist = null;
    },
    shareWishlist: (state, action) => {
      const wishlist = state.wishlists.find((w) => w.id === action.payload);
      if (wishlist && wishlist.listLink) {
        const fullLink = `http://localhost:5173/wishlist/${wishlist.listLink}`;
        navigator.clipboard
          .writeText(fullLink)
          .then(() => {
            console.log(`Ссылка скопирована: ${fullLink}`);
          })
          .catch((err) => console.error("Ошибка при копировании ссылки:", err));
      } else {
        console.error("Ошибка: Wishlist не найден или отсутствует listLink.");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Получение всех вишлистов
      .addCase(getAllWishlistsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllWishlistsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlists = action.payload;
      })
      .addCase(getAllWishlistsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Получение вишлиста по ID аккаунта
      .addCase(getWishlistByAccountIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWishlistByAccountIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlists = action.payload;
      })
      .addCase(getWishlistByAccountIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Получение вишлиста по ID
      .addCase(getWishlistByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWishlistByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentWishlist = action.payload;
      })
      .addCase(getWishlistByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Создание вишлиста
      .addCase(createWishlistThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWishlistThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(createWishlistThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Обновление вишлиста
      .addCase(updateWishlistThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateWishlistThunk.fulfilled, (state, action) => {
        state.status = "succeeded";

        const list = JSON.parse(JSON.stringify(state.wishlists));
        const updateItem = JSON.parse(action.payload);
        console.log(updateItem);
        const updateList = list.map((item) =>
          item.id === updateItem.id ? updateItem : item
        );
        state.wishlists = updateList;
      })
      .addCase(updateWishlistThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Удаление вишлиста
      .addCase(deleteWishlistThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlists = state.wishlists.filter(
          (w) => w.id !== action.meta.arg
        );
      })
      .addCase(deleteWishlistThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Деактивация вишлиста
      .addCase(deactivateWishlistThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deactivateWishlistThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const wishlist = state.wishlists.find((w) => w.id === action.meta.arg);
        if (wishlist) {
          wishlist.isActive = false;
        }
      })
      .addCase(deactivateWishlistThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentWishlist, shareWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;

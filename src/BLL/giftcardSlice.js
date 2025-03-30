import { createSlice } from "@reduxjs/toolkit";
import {
  getAllGiftcardsThunk,
  getGiftcardByWishlistsIdThunk,
  getGiftcardByIdThunk,
  createGiftcardThunk,
  updateGiftcardThunk,
  deleteGiftcardThunk,
  reserveGiftcardThunk,
  getGiftcardByLinkThunk,
} from "../DAL/GiftcardThunk";

const initialState = {
  giftcards: [],
  loading: false,
  error: null,
};

const giftcardSlice = createSlice({
  name: "giftcards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Получить все подарочные карты
      .addCase(getAllGiftcardsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGiftcardsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.giftcards = action.payload;
      })
      .addCase(getAllGiftcardsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Получить подарки по ID вишлиста
      .addCase(getGiftcardByWishlistsIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGiftcardByWishlistsIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.giftcards = action.payload;
      })
      .addCase(getGiftcardByWishlistsIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Получить подарки по ссылке вишлиста
      .addCase(getGiftcardByLinkThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGiftcardByLinkThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.giftcards = action.payload;
      })
      .addCase(getGiftcardByLinkThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Получить подарочную карту по ID
      .addCase(getGiftcardByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGiftcardByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedGiftcards = state.giftcards.map((giftcard) =>
          giftcard.id === action.payload.id ? action.payload : giftcard
        );
        state.giftcards = updatedGiftcards;
      })
      .addCase(getGiftcardByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Создать подарочную карту
      .addCase(createGiftcardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGiftcardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.giftcards.push(action.payload);
      })
      .addCase(createGiftcardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Обновить подарочную карту
      .addCase(updateGiftcardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateGiftcardThunk.fulfilled, (state, action) => {
        state.loading = false;
        // const index = state.giftcards.findIndex((g) => g.id === action.payload.id);
        // if (index !== -1) {
        //   state.giftcards[index] = action.payload;
        // }

        const list = JSON.parse(JSON.stringify(state.giftcards));
        const updateItem = JSON.parse(action.payload);
        const updateList = list.map((item) =>
          item.id === updateItem.id ? updateItem : item
        );
        state.giftcards = updateList;
      })
      .addCase(updateGiftcardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Удалить подарочную карту
      .addCase(deleteGiftcardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGiftcardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.giftcards = state.giftcards.filter(
          (g) => g.id !== action.meta.arg
        );
      })
      .addCase(deleteGiftcardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Забронировать подарочную карту
      .addCase(reserveGiftcardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reserveGiftcardThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.giftcards.findIndex(
          (g) => g.id === action.payload.id
        );
        if (index !== -1) {
          state.giftcards[index].isReserved = action.payload.isReserved;
        }
      })
      .addCase(reserveGiftcardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default giftcardSlice.reducer;

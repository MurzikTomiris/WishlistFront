import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5294/api/wishlist";

// Получение всех вишлистов
export const getAllWishlistsThunk = createAsyncThunk(
  "wishlistSlice/getAllWishlistsThunk",
  async () => {
    const request = await fetch(`${BASE_URL}/getAllWishlists`);
    return request.json();
  }
);

// Получение вишлиста по ID аккаунта
export const getWishlistByAccountIdThunk = createAsyncThunk(
  "wishlistSlice/getWishlistByAccountIdThunk",
  async (accountId) => {
    const request = await fetch(
      `${BASE_URL}/getWishlistByAccountId/${accountId}`
    );
    return request.json();
  }
);

// Получение вишлиста по ID
export const getWishlistByIdThunk = createAsyncThunk(
  "wishlistSlice/getWishlistByIdThunk",
  async (id) => {
    const request = await fetch(`${BASE_URL}/getWishlistById/${id}`);
    return request.json();
  }
);

// Создание нового вишлиста
export const createWishlistThunk = createAsyncThunk(
  "wishlistSlice/createWishlistThunk",
  async (wishlist) => {
    const request = await fetch(`${BASE_URL}/createWishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wishlist),
    });

    return request.json();
  }
);

// Обновление вишлиста
export const updateWishlistThunk = createAsyncThunk(
  "wishlistSlice/updateWishlistThunk",
  async (wishlistItem, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/updateWishlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistItem),
      });

      if (response.ok) {
        return JSON.stringify(wishlistItem);
      }
    } catch (error) {
      console.error("Ошибка в updateWishlistThunk:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Удаление вишлиста
export const deleteWishlistThunk = createAsyncThunk(
  "wishlistSlice/deleteWishlistThunk",
  async (id) => {
    const request = await fetch(`${BASE_URL}/deleteWishlist/${id}`, {
      method: "DELETE",
    });

    return request.json();
  }
);

// Деактивация вишлиста
export const deactivateWishlistThunk = createAsyncThunk(
  "wishlistSlice/deactivateWishlistThunk",
  async ({ id }) => {
    const request = await fetch(`${BASE_URL}/deactivateWishlist/${id}`);
    return request.json();
  }
);

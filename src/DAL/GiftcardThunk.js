import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5294/api/giftcard";

// Получить все подарочные карты
export const getAllGiftcardsThunk = createAsyncThunk(
  "giftcardSlice/getAllGiftcardsThunk",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/getAllGiftcards`);
      if (!response.ok) throw new Error("Ошибка при получении списка подарков");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Получить подарочные карты по ID вишлиста
export const getGiftcardByWishlistsIdThunk = createAsyncThunk(
  "giftcardSlice/getGiftcardByWishlistsIdThunk",
  async (wishlistId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/getGiftcardByWishlistsId/${wishlistId}`
      );
      if (!response.ok)
        throw new Error("Ошибка при получении подарков вишлиста");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Получить подарочные карты по ссылке
export const getGiftcardByLinkThunk = createAsyncThunk(
  "giftcardSlice/getGiftcardByLinkThunk",
  async (listLink, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/GetGiftcardByLink/${listLink}`);
      if (!response.ok)
        throw new Error("Ошибка при получении подарков вишлиста");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Получить подарочную карту по ID
export const getGiftcardByIdThunk = createAsyncThunk(
  "giftcardSlice/getGiftcardByIdThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/getGiftcardById/${id}`);
      if (!response.ok) throw new Error("Ошибка при получении подарка");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создать подарочную карту
export const createGiftcardThunk = createAsyncThunk(
  "giftcardSlice/createGiftcardThunk",
  async (giftcard, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/createGiftcard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(giftcard),
      });
      if (!response.ok) throw new Error("Ошибка при создании подарка");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Обновить подарочную карту
export const updateGiftcardThunk = createAsyncThunk(
  "giftcardSlice/updateGiftcardThunk",
  async (giftcard, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/updateGiftcard`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(giftcard),
      });
      if (!response.ok) throw new Error("Ошибка при обновлении подарка");
      if (response.ok) {
        return JSON.stringify(giftcard);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удалить подарочную карту
export const deleteGiftcardThunk = createAsyncThunk(
  "giftcardSlice/deleteGiftcardThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/deleteGiftcard/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Ошибка при удалении подарка");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Забронировать подарочную карту
export const reserveGiftcardThunk = createAsyncThunk(
  "giftcardSlice/reserveGiftcardThunk",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/reserveGiftcard/${id}`);
      if (!response.ok) throw new Error("Ошибка при бронировании подарка");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

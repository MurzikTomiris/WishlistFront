import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLS } from "../utils/actionLocalStorage";

// Получить все аккаунты
export const getAllAccountsThunk = createAsyncThunk(
  "accountSlice/getAllAccounts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5294/api/account/getAllAccounts"
      );
      if (!response.ok) throw new Error("Failed to fetch accounts");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Получить аккаунт по ID
export const getAccountByIdThunk = createAsyncThunk(
  "accountSlice/getAccountById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5294/api/account/getAccountById/${id}`
      );
      if (!response.ok) throw new Error("Failed to fetch account");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Создать новый аккаунт
export const createNewAccountThunk = createAsyncThunk(
  "accountSlice/createNewAccount",
  async (account, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5294/api/account/createAccount",
        {
          method: "POST",
          body: JSON.stringify(account),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to create account");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Обновить аккаунт
export const updateAccountThunk = createAsyncThunk(
  "accountSlice/updateAccount",
  async (account, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5294/api/account/updateAccount",
        {
          method: "PUT",
          body: JSON.stringify(account),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setLS("user", JSON.stringify(account));
        return account;
      }
      if (!response.ok) throw new Error("Failed to update account");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удалить аккаунт
export const deleteAccountThunk = createAsyncThunk(
  "accountSlice/deleteAccount",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5294/api/account/deleteAccount/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete account");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Авторизация (вход в систему)
export const LoginThunk = createAsyncThunk(
  "accountSlice/Login",
  async (account, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5294/api/account/login", {
        method: "POST",
        body: JSON.stringify(account),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();

      setLS("user", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

import { createSlice } from "@reduxjs/toolkit";
import {
    getAllAccountsThunk,
    getAccountByIdThunk,
    createNewAccountThunk,
    updateAccountThunk,
    deleteAccountThunk,
    LoginThunk, 
} from "../DAL/AccountThunk"

const initialState = {
    accounts: [],
    currentAccount: null, // Текущий пользователь (авторизованный или только что созданный)
    status: "idle", // idle | loading | succeeded | failed
    message: null,
    error: null,
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        logout: (state) => {
            state.currentAccount = null;
        },
        getUserFromLS: (state, {payload}) => {
            state.currentAccount = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Получить все аккаунты
            .addCase(getAllAccountsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllAccountsThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accounts = action.payload;
            })
            .addCase(getAllAccountsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Получить аккаунт по ID
            .addCase(getAccountByIdThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAccountByIdThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentAccount = action.payload;
            })
            .addCase(getAccountByIdThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Создать новый аккаунт и сохранить его в currentAccount
            .addCase(createNewAccountThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createNewAccountThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accounts.push(action.payload);
                state.message = "Аккаунт успешно создан!";
            })
            .addCase(createNewAccountThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Обновить аккаунт
            .addCase(updateAccountThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAccountThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentAccount = {...state.currentAccount, ...action.payload}
            })
            .addCase(updateAccountThunk.rejected, (state) => {
                state.status = "failed"; 
            })

            // Удалить аккаунт
            .addCase(deleteAccountThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAccountThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.accounts = state.accounts.filter(acc => acc.id !== action.meta.arg);
            })
            .addCase(deleteAccountThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // Авторизация (вход) и сохранение пользователя в currentAccount
            .addCase(LoginThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(LoginThunk.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentAccount = action.payload; // Сохраняем авторизованного пользователя
            })
            .addCase(LoginThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { logout, getUserFromLS } = accountSlice.actions;
export default accountSlice.reducer;

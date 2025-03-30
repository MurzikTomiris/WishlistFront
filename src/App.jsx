import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./UI/pages/Home";
import { Account } from "./UI/pages/Account";
import { Wishlist } from "./UI/pages/Wishlist";
import { Giftcards } from "./UI/pages/Giftcards";
import { useSelector } from "react-redux";

export const App = () => {
  const { currentAccount } = useSelector((state) => state.account);

  return (
    <>
      <Routes>
        {/* Главная страница */}
        <Route path="/" element={currentAccount ? <Navigate to="/wishlist" /> : <Home />} />

        {/* Аккаунт */}
        <Route path="/account/:id" element={<Account />} />

        {/* Вишлисты */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Подарочные карты */}
        <Route path="/wishlist/:listLink" element={<Giftcards />} />

        {/* 404 страница */}
        <Route path="*" element={<h1>Страница не найдена</h1>} />
      </Routes>
    </>
  );
};

export default App;

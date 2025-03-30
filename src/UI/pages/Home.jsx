import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginThunk, createNewAccountThunk } from "../../DAL/AccountThunk";
import { RegisterModal } from "../components/RegisterModal";

import { useCheckAuthUser } from "../../hooks/useCheckAuthUser";

import "../style/wishlist.css";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserStatus = useCheckAuthUser();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const { currentAccount, status, error } = useSelector((state) => state.account);

  useEffect(() => {
    if (status === "succeeded" && currentAccount) {
      navigate(`/wishlist`, { state: { accountId: currentAccount.id } });
    }
  }, [status, currentAccount, navigate]);
  

  const handleLogin = () => {
    dispatch(LoginThunk({ login, password }));
  };

  const handleRegister = (newAccount) => {
    dispatch(createNewAccountThunk(newAccount)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setShowRegisterModal(false);
      }
    });
  };

  return (
    <div className="home">
      <h1>Добро пожаловать в Make your wish</h1>
      <p>Создайте список желаний и поделитесь им с друзьями!</p>
      <div className="login-form">
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button" disabled={status === "loading"}>
          {status === "loading" ? "Вход..." : "Войти"}
        </button>
        <button onClick={() => setShowRegisterModal(true)} className="register-button">
          Зарегистрироваться
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>

      {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} onRegister={handleRegister} />}
    </div>
  );
};

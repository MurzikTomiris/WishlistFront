import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAccountByIdThunk,
  updateAccountThunk,
  deleteAccountThunk,
} from "../../DAL/AccountThunk";
import { logout } from "../../BLL/accountSlice";
import { delLS } from "../../utils/actionLocalStorage";

import "../style/wishlist.css";

export const Account = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentAccount, status, error } = useSelector(
    (state) => state.account
  );
  const [isModalOpen, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(getAccountByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentAccount) {
      setFormData(currentAccount);
    }
  }, [currentAccount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    dispatch(updateAccountThunk(formData));
    setEditMode(false);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAccountThunk(id));
      delLS("user");
      navigate("/");
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const sighOut = () => {
    dispatch(logout());
    delLS("user");
    navigate("/");
  };

  if (status === "loading") {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p className="error-message">Ошибка: {error}</p>;
  }

  if (!currentAccount) {
    return <p>Не доступна информация об аккаунте</p>;
  }

  return (
    <div className="account-page">
      <h1>Детали аккаунта</h1>
      {isModalOpen ? (
        <div className="account-form">
          <label>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Логин:
            <input
              type="text"
              name="login"
              value={formData.login || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Пароль:
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
            />
          </label>
          <button className="save-button" onClick={handleSave}>
            Сохранить
          </button>
          <button className="cancel-button" onClick={() => setEditMode(false)}>
            Отмена
          </button>
        </div>
      ) : (
        <div className="account-details">
          <p>Имя: {currentAccount.name}</p>
          <p>Email: {currentAccount.email}</p>
          <p>Логин: {currentAccount.login}</p>
          <p>Пароль: {currentAccount.password}</p>
          <button onClick={() => navigate("/")}>Назад</button>
          <button onClick={() => setEditMode(true)}>Редактировать</button>
          <button onClick={handleDelete}>Удалить аккаунт</button>
          <button onClick={sighOut}>Выйти из аккаунта</button>
        </div>
      )}
    </div>
  );
};

export default Account;

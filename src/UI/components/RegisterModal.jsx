import { useState } from "react";
import "../style/wishlist.css";

export const RegisterModal = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({ name: "", email: "", login: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await onRegister(formData); // Вызываем переданный коллбэк
      setSuccessMessage("Аккаунт успешно создан!"); // Показываем сообщение
      setTimeout(() => {
        setSuccessMessage(""); // Очищаем сообщение
        onClose(); // Закрываем модалку
      }, 20000); // Через 2 секунды скрываем
    } catch (error) {
      console.error("Ошибка регистрации:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Регистрация</h2>
        {successMessage && <p className="success-message">{successMessage}</p>} {/* Выводим сообщение */}
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="login"
          placeholder="Логин"
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="save-button" onClick={handleRegister}>Зарегистрироваться</button>
        <button className="cancel-button" onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

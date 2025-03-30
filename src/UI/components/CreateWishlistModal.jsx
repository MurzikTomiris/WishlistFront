import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWishlistThunk, getWishlistByAccountIdThunk } from "../../DAL/WishlistThunk";
import "../style/wishlist.css";

const CreateWishlistModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((state) => state.account);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAccount) {
      alert("Ошибка: Пользователь не авторизован!");
      return;
    }

    const newWishlist = {
      name: formData.name,
      description: formData.description,
      accountId: currentAccount.id,
      listLink: formData.name,
    };

    try {
      await dispatch(createWishlistThunk(newWishlist));
      dispatch(getWishlistByAccountIdThunk(currentAccount.id)); // 🔹 Без .unwrap()
    } catch (error) {
      console.error("Ошибка создания вишлиста:", error);
    }

    onClose(); // Закрываем модалку после запроса
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Создать новый вишлист</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Название"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Описание"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <button className="save-button" type="submit">
            Создать
          </button>
          <button className="cancel-button" type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateWishlistModal;

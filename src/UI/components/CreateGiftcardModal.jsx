import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGiftcardThunk, getGiftcardByWishlistsIdThunk } from "../../DAL/GiftcardThunk";
import "../style/wishlist.css";

const CreateGiftcardModal = ({ isOpen, onClose, wishlistId }) => {
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    link: "",
    image: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wishlistId) {
      alert("Ошибка: Wishlist не найден!");
      return;
    }

    const newGiftcard = {
      ...formData,
      price: parseFloat(formData.price), // Преобразование строки в число
      wishlistId: wishlistId,
    };

    try {
      await dispatch(createGiftcardThunk(newGiftcard));
      dispatch(getGiftcardByWishlistsIdThunk(wishlistId));
    } catch (error) {
      console.error("Ошибка создания подарочной карты:", error);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить подарок</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Название"
            value={formData.title}
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
          <input
            type="number"
            name="price"
            placeholder="Цена"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="link"
            placeholder="Ссылка на товар"
            value={formData.link}
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            placeholder="Ссылка на изображение"
            value={formData.image}
            onChange={handleChange}
          />
          <button className="save-button" type="submit">Добавить</button>
          <button className="cancel-button" type="button" onClick={onClose}>Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default CreateGiftcardModal;

/* eslint-disable react/prop-types */ // Отключаем проверку prop-types

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  reserveGiftcardThunk,
  deleteGiftcardThunk,
  updateGiftcardThunk,
} from "../../DAL/GiftcardThunk";
import "../style/wishlist.css";

const GiftCard = ({ card, isOwner }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [isReserved, setIsReserved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (card) {
      setFormData(card);
      setIsReserved(card.isReserved);
    }
  }, [card]);

  const handleReserve = () => {
    dispatch(reserveGiftcardThunk(formData.id));
    setIsReserved(!isReserved);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteGiftcardThunk(formData.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    dispatch(updateGiftcardThunk(formData));
    setIsModalOpen(false);
  };

  if (!formData.title) return null; // Если данных нет, ничего не рендерим

  return (
    <div className="gift-card">
      {isModalOpen ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Редактировать карточку подарка</h2>
            <label>
              Название:
              <input
                type="text"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Описание:
              <input
                type="text"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Цена:
              <input
                type="number"
                name="price"
                value={formData.price || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Ссылка:
              <input
                type="text"
                name="link"
                value={formData.link || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Изображение:
              <input
                type="text"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
              />
            </label>
            <div className="modal-actions">
              <button className="save-button" onClick={handleEdit}>
                Сохранить
              </button>
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <img
            src={formData.image}
            alt={formData.title}
            className="gift-card-image"
          />
          <h3>{formData.title}</h3>
          <p>{formData.description}</p>
          <p>Цена: {formData.price} ₽</p>
          <a
            href={
              formData.link?.startsWith("http")
                ? formData.link
                : `https://${formData.link}`
            }
            target="_blank"
          >
            Ссылка на подарок
          </a>

          {isReserved ? (
            <div className="reserved-badge">Зарезервировано</div>
          ) : null}

          <div className="actions">
            <button onClick={handleReserve} className="reserve-button">
              {isReserved ? "Убрать резерв" : "Зарезервировать"}
            </button>
            {isOwner && (
              <>
                <button onClick={() => setIsModalOpen(true)}>
                  Редактировать
                </button>
                <button onClick={handleDelete} className="delete-button">
                  Удалить
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GiftCard;

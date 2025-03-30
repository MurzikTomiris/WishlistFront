import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shareWishlist } from "../../BLL/wishlistSlice";
import {
  updateWishlistThunk,
  deleteWishlistThunk,
  deactivateWishlistThunk,
} from "../../DAL/WishlistThunk";

import "../style/wishlist.css";

/* eslint-disable react/prop-types */ // Отключаем проверку prop-types

const WishlistCard = ({ wishlist, isOwner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isActive, setIsActive] = useState(wishlist.isActive);

  useEffect(() => {
    if (wishlist) {
      setFormData(wishlist);
      setIsActive(wishlist.isActive);
    }
  }, [wishlist]);

  const handleNavigate = () => {
    navigate(`/wishlist/${wishlist.listLink}`, {
      state: { wishlistId: wishlist.id },
    });
  };

  const handleShare = (e) => {
    e.stopPropagation();
    dispatch(shareWishlist(wishlist.id));
  };

  const handleEdit = () => {
    console.log(formData);

    dispatch(updateWishlistThunk({ ...formData, isActive: Number(isActive) }));
    setModalOpen(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteWishlistThunk(wishlist.id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleVisibilityChange = (e) => {
    const newStatus = e.target.value === "true";
    setIsActive(newStatus);

    dispatch(deactivateWishlistThunk({ id: wishlist.id }));
  };

  if (!wishlist) return null; // Проверяем, передан ли wishlist, если нет — ничего не рендерим

  return (
    <div className="wishlist-card">
      {isModalOpen ? (
        <div className="modal">
          <div className="modal-content">
            <h2>Редактировать Wishlist</h2>
            <label>
              Название:
              <input
                type="text"
                name="name"
                value={formData.name || ""}
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

            {/* Радио-кнопки для управления видимостью */}
            <div className="visibility-options">
              <label>
                <input
                  type="radio"
                  name="isActive"
                  value="true"
                  checked={isActive}
                  onChange={handleVisibilityChange}
                />
                Показать
              </label>
              <label>
                <input
                  type="radio"
                  name="isActive"
                  value="false"
                  checked={!isActive}
                  onChange={handleVisibilityChange}
                />
                Скрыть
              </label>
            </div>

            <div className="modal-actions">
              <button className="save-button" onClick={handleEdit}>
                Сохранить
              </button>
              <button
                className="cancel-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalOpen(false);
                }}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="wishlist-card-content"
            onClick={handleNavigate}
            style={{
              cursor: isActive || isOwner ? "pointer" : "not-allowed",
              opacity: isActive ? 1 : 0.6,
            }}
          >
            {/* Плашка "Скрыто", если вишлист неактивен */}
            {!isActive && <div className="wishlist-hidden-badge">Скрыто</div>}
            <h3 className="wishlist-title">
              {wishlist.name ? <em>{wishlist.name}</em> : "Без названия"}
            </h3>
          </div>
          <div className="wishlist-actions">
            <button onClick={handleShare}>Поделиться</button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalOpen(true);
              }}
            >
              Редактировать
            </button>
            <button onClick={handleDelete}>Удалить</button>
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistCard;

import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GiftCard from "../components/GiftCard";
import { getGiftcardByLinkThunk } from "../../DAL/GiftcardThunk";
import { Title } from "../components/Title";
import "../style/wishlist.css";
import { useCheckAuthUser } from "../../hooks/useCheckAuthUser";
import { getWishlistByIdThunk } from "../../DAL/WishlistThunk";
import { Icon } from "../components/Icons/Icon";
import CreateGiftcardModal from "../components/CreateGiftcardModal";

export const Giftcards = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { listLink } = useParams();

  useCheckAuthUser();

  // Состояния
  const [accountId, setAccountId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wishlistId, setWishlistId] = useState(
    location.state?.wishlistId || null
  );

  // Получаем данные из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAccountId(parsedUser.id);
      } catch (error) {
        console.error("❌ Ошибка парсинга user из localStorage:", error);
      }
    }
  }, []);

  // Если `wishlistId` не задан, загружаем его по `listLink`
  useEffect(() => {
    if (listLink) {
      dispatch(getGiftcardByLinkThunk(listLink))
        .then((response) => {
          if (response.payload?.length > 0) {
            const extractedWishlistId = response.payload[0].wishlistId;
            setWishlistId(extractedWishlistId);
          }
        })
        .catch((error) => {
          console.error("❌ Ошибка при получении подарочных карт:", error);
        });
    }
  }, [dispatch, listLink, wishlistId]);

  // Загружаем wishlist, если у нас есть `wishlistId`
  useEffect(() => {
    if (wishlistId) {
      dispatch(getWishlistByIdThunk(wishlistId));
    }
  }, [dispatch, wishlistId]);

  // Получаем данные из Redux
  const currentWishlist = useSelector(
    (state) => state.wishlist.currentWishlist
  );
  const giftcards = useSelector((state) => state.giftcard.giftcards);

  const isActive = currentWishlist?.isActive;
  console.log(isActive);

  // Проверяем, является ли пользователь владельцем wishlist
  const isOwner = currentWishlist
    ? currentWishlist.accountId === accountId
    : false;

  return (
    <div className="giftcards-page">
      <Title />
      <h1>Ваш Wishlist</h1>

      {wishlistId === null ? (
        <p>Wishlist пока пустой</p>
      ) : !isActive ? (
        <p>Wishlist скрыт хозяином</p>
      ) : (
        <>
          {isOwner && (
            <span className="add-btn" onClick={() => setIsModalOpen(true)}>
              <Icon config={{ icon: "AddIcon", fill: "black" }} />
            </span>
          )}
          {isModalOpen && (
            <CreateGiftcardModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              wishlistId={wishlistId}
            />
          )}
          <div className="giftcards-grid">
            {giftcards.length > 0 ? (
              giftcards.map((giftcard) => (
                <GiftCard key={giftcard.id} card={giftcard} isOwner={isOwner} />
              ))
            ) : (
              <p>Пока нет подарков</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

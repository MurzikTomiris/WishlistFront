import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WishlistCard from "../components/WishlistCard";
import { getWishlistByAccountIdThunk } from "../../DAL/WishlistThunk";
import { Icon } from "../components/Icons/Icon";
import CreateWishlistModal from "../components/CreateWishlistModal";

import "../style/wishlist.css";
import { Title } from "../components/Title";
import { useCheckAuthUser } from "../../hooks/useCheckAuthUser";

export const Wishlist = () => {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector((state) => state.account);
  const wishlists = useSelector((state) => state.wishlist.wishlists);

  const checkUserStatus = useCheckAuthUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      dispatch(getWishlistByAccountIdThunk(currentAccount.id));
    }
  }, [dispatch, currentAccount]);

  if (!currentAccount) {
    return <h2>Ошибка: Пользователь не авторизован</h2>;
  }

  return (
    <div className="wishlist-page">
      <Title />
      <h1>Мои вишлисты</h1>
      <span className="add-btn" onClick={() => setIsModalOpen(true)}>
        <Icon config={{ icon: "AddIcon", fill: "black" }} />
      </span>

      <div className="wishlist-grid">
        {wishlists.map((wishlist) => (
          <WishlistCard key={wishlist.id} wishlist={wishlist} />
        ))}
      </div>

      {isModalOpen && (
        <CreateWishlistModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

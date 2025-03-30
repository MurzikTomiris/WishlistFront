import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "../style/wishlist.css";

export const Title = () => {
  const navigate = useNavigate();
  const { currentAccount } = useSelector((state) => state.account);

  return (
    <div className="title">
      <button 
        className="btn-account" 
        onClick={() => navigate(`/account/${currentAccount?.id ?? "default"}`)}
      >
        Аккаунт
      </button>
    </div>
  );
};

import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { imgUrl, ls } from "@/store-client/src/utils";
import { useAppSelector } from "@/store-client/src/store";
import { defaultUresAvatar } from "@/store-client/src/constants";

export const AccountUserInfo = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.data);

  const handelLogout = () => {
    ls.remove();
    navigate("/sign-in");
  };

  return (
    <div className="account-info">
      <div className="account-info-picture">
        <img
          src={user?.avatar ? imgUrl(user?.avatar) : defaultUresAvatar}
          alt="user avatar"
        />
      </div>
      <div className="account-info-name">{user?.firstName}</div>
      <button className="account-logout" onClick={handelLogout}>
        <GrLogout fontSize={20} />
      </button>
    </div>
  );
};

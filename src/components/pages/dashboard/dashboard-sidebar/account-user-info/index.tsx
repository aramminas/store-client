import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { imgUrl, ss } from "@/store-client/src/utils";
import { useAppSelector } from "@/store-client/src/store";
import apiHandler from "@/store-client/src/constants/api";
import { defaultUresAvatar } from "@/store-client/src/constants";

export const AccountUserInfo = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.data);

  const handelLogout = async () => {
    const response = await apiHandler("users/logout");

    if (response.status === 200) {
      ss.remove();
      navigate("/login");
    }
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

import apiHandler from "../constants/api";
import { useNavigate } from "react-router-dom";

import { getJwtData } from "../utils";
import { useAppDispatch } from "../store";
import { setUserData } from "../store/slices/user.slice";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const refetchUserData = async () => {
    const userId = getJwtData()?.user?.id;

    if (!userId) {
      navigate("/login");
      return;
    }

    const response = await apiHandler(`users/${userId}`);

    if (response.data) {
      dispatch(setUserData(response.data));
      return;
    }

    navigate("/login");
  };

  return refetchUserData;
};

import apiHandler from "../constants/api";
import { ls } from "../utils";
import { useAppDispatch } from "../store";
import { setUserData } from "../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const refetchUserData = async () => {
    const userId = ls.get();
    const response = await apiHandler(`users/${userId}`);

    if (response.data) {
      dispatch(setUserData(response.data));
      return;
    }

    navigate("/sign-in");
  };

  return refetchUserData;
};

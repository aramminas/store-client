import { createSlice } from "@reduxjs/toolkit";
import { UserT } from "../../types";

interface UserState {
  data: UserT | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setUserData(state: UserState, action) {
      state.data = action.payload;
    },
    resetUserData(state: UserState) {
      state.data = null;
    },
  },
});

export const { setUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;

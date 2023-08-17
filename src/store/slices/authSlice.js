import { createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/auth/login";

const emptyState = {
  id: "",
  token: "",
  fullName: "",
  email: "",
  phone: "",
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("sessionData")) ?? emptyState,
  reducers: {
    updateUserData(state, action) {
      //la data que llega sale de action.payload
      const newUserData = action.payload;
      state.id = newUserData.id;
      state.fullName = newUserData.fullName;
      state.email = newUserData.email;
      state.phone = newUserData.phone;
      const plainStateCopy = { ...state }; // aca le sacamos lo del proxy al copiarlo
      localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
    },

    updateToken(state, action) {
      const newToken = action.payload;
      state.token = newToken;
      const plainStateCopy = { ...state }; // aca le sacamos lo del proxy al copiarlo
      localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
    },

    startSession(state) {
      state.isLogged = true;
      const plainStateCopy = { ...state }; // aca le sacamos lo del proxy al copiarlo
      localStorage.setItem("sessionData", JSON.stringify(plainStateCopy));
    },

    reset() {
      localStorage.removeItem("sessionData");
      return emptyState;
    },
  },
});

export const { updateUserData, updateToken, startSession, reset } =
  authSlice.actions;

export const startSessionThunk =
  ({ email, password }) =>
  async (dispatch) => {
    const res = await login({ email, password });
    const userData = {
      id: res.user.id,
      fullName: `${res.user.firstName} ${res.user.lastName}`,
      email: res.user.email,
      phone: res.user.phone,
    };
    dispatch(updateUserData(userData));
    dispatch(updateToken(res.token));
    dispatch(startSession());
  };
export default authSlice.reducer;

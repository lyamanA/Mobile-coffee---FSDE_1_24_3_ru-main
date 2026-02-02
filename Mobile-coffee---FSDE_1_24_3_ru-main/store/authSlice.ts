import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  email: string;
  password: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
};

const initialState: AuthState = {
  users: [],
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    login(state, action: PayloadAction<User>) {
      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) state.currentUser = user;
    },
    logout(state) {
      state.currentUser = null;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    user: {
      email: "",
      uid: "",
      username: "",
      first_name: "",
      last_name: "",
      is_technician: false,
      is_teacher: false,
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        email: action.payload.email,
        uid: action.payload.uid,
        username: action.payload.username,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        is_technician: action.payload.is_technician,
        is_teacher: action.payload.is_teacher,
      };
    },
    clear: (state) => {
      state.user = {
        email: "",
        uid: "",
        username: "",
        first_name: "",
        last_name: "",
        is_technician: false,
        is_teacher: false
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clear } = UserSlice.actions;

export default UserSlice.reducer;

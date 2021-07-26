import { configureStore } from "@reduxjs/toolkit";
import repos from "../slices/reposSlice";
const store = configureStore({
  reducer: {
    repos,
  },
});

export default store;

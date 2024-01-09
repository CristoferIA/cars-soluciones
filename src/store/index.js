import { configureStore } from "@reduxjs/toolkit";
import nombreMenuSlice from "./slices/nombreMenu.slice";

export default configureStore({
  reducer: { nombreMenuSlice },
});

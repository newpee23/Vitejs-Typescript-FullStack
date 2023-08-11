import { configureStore } from "@reduxjs/toolkit";
import { useSelector , useDispatch , TypedUseSelectorHook } from "react-redux";
import formInput from "./slices/formInput";
import showdetail from "./slices/showdetail";
const store = configureStore({
    reducer: {
        forminput: formInput,
        showdetail: showdetail,
    },
  });

  type RootState = ReturnType<typeof store.getState>
type AppDispath = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispath>();

export default store;
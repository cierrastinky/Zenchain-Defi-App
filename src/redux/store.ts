// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
  },
});

// 👇 types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 👇 custom hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { configureStore } from "@reduxjs/toolkit";
import { peoplesApi } from "../api/peoplesApi";

export const store = configureStore({
  reducer: {
    [peoplesApi.reducerPath]: peoplesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peoplesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

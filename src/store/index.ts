import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { githubApi } from "./github/github.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import { reducer as gitHubReducer } from "./github/github.slice";

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    gitHub: gitHubReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

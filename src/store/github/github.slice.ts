import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IGitHubState {
  favorites: string[];
}

const LS_FAV_KEY = "rfk";

const initialState: IGitHubState = {
  favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const gitHubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },

    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((f) => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
    },
  },
});

export const { actions, reducer } = gitHubSlice;

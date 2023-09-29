import { createSlice } from "@reduxjs/toolkit";

interface IGitHubState {
  favorites: string[];
}

const initialState: IGitHubState = {
  favorites: [],
};

export const gitHubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavorites(state, payload) {},
  },
});

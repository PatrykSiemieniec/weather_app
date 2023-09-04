import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CityState {
  city: string;
  refreshLocalStorage: boolean;
}

const initialState: CityState = {
  city: "Kielce",
  refreshLocalStorage: false,
};

export const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    choseCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    refreshLocalStorage: (state) => {
      state.refreshLocalStorage = !state.refreshLocalStorage;
    },
  },
});

export const { choseCity, refreshLocalStorage } = citySlice.actions;

export default citySlice.reducer;

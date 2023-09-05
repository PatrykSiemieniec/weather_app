import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import forecast from "../types/forecast";
export interface ForecastState {
  hoursData: forecast[];
}

const initialState: ForecastState = {
  hoursData: [],
};

export const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setHoursData: (state, action: PayloadAction<forecast[]>) => {
      state.hoursData = action.payload;
    },
  },
});

export const { setHoursData } = forecastSlice.actions;

export default forecastSlice.reducer;

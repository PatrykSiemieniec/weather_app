import { configureStore } from "@reduxjs/toolkit";
import cityReducer from "./citySlice";
import forecastReducer from "./forecastSlice";
// if ("geolocation" in navigator) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       // Handle the user's location data
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;

//       // Do something with the location information
//     },
//     function (error) {
//       // Handle any errors that occur when trying to get the location
//       switch (error.code) {
//         case error.PERMISSION_DENIED:
//           // User denied the request for geolocation
//           break;
//         case error.POSITION_UNAVAILABLE:
//           // Location information is unavailable
//           break;
//         case error.TIMEOUT:
//           // The request to get user location timed out
//           break;
//         default:
//           // An unknown error occurred
//           break;
//       }
//     }
//   );
// } else {
//   // Geolocation is not available in this browser
// }

export const store = configureStore({
  reducer: {
    city: cityReducer,
    forecast: forecastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

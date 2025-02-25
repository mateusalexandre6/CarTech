import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import clientReducer from "./slices/clientsSlice";
import vehicleReducer from "./slices/vehiclesSlice";
import mechanicReducer from "./slices/mechanicSlice";
import serviceReducer from "./slices/servicesSlice";

export const  store = configureStore({
  reducer: {
    auth: authReducer,
    clients: clientReducer,
    vehicles: vehicleReducer,
    mechanics: mechanicReducer,
    services: serviceReducer,

  },
});

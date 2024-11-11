import { configureStore } from '@reduxjs/toolkit';
import vehicleReducer from '../features/vehicles/vehicleSlice';

const store = configureStore({
  reducer: {
    vehicles: vehicleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

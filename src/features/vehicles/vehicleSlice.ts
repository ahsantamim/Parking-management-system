import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vehicle } from './types';
import { RootState } from '../../store';

const initialState: Vehicle[] = JSON.parse(
  localStorage.getItem('vehicles') || '[]'
);

const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.push(action.payload);
      localStorage.setItem('vehicles', JSON.stringify(state));
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('vehicles', JSON.stringify(state));
      }
    },
    removeVehicle: (state, action: PayloadAction<string>) => {
      const updatedState = state.filter((v) => v.id !== action.payload);
      localStorage.setItem('vehicles', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { addVehicle, updateVehicle, removeVehicle } =
  vehicleSlice.actions;

export const selectVehicles = (state: RootState) => state.vehicles;

export default vehicleSlice.reducer;

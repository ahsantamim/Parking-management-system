import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectVehicles,
  updateVehicle,
} from '../features/vehicles/vehicleSlice';
import { Vehicle } from '../features/vehicles/types';

const VehicleList: React.FC = () => {
  const vehicles = useSelector(selectVehicles);
  const dispatch = useDispatch();

  const handleExit = (vehicle: Vehicle) => {
    // Ensure status is explicitly set as 'Out' to match VehicleStatus type
    const updatedVehicle: Vehicle = {
      ...vehicle,
      status: 'Out',
      exitTime: new Date().toISOString(),
    };
    dispatch(updateVehicle(updatedVehicle));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Vehicle List</h2>
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left">Owner Name</th>
            <th className="px-6 py-3 text-left">Vehicle Type</th>
            <th className="px-6 py-3 text-left">License No</th>
            <th className="px-6 py-3 text-left">Entry Time</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {vehicles.map((vehicle) => (
            <tr
              key={vehicle.id}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="px-6 py-4">{vehicle.ownerName}</td>
              <td className="px-6 py-4">{vehicle.vehicleType}</td>
              <td className="px-6 py-4">{vehicle.licenseNumber}</td>
              <td className="px-6 py-4">
                {new Date(vehicle.entryTime).toLocaleString()}
              </td>
              <td className="px-6 py-4">{vehicle.status}</td>
              <td className="px-6 py-4">
                {vehicle.status === 'In' && (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-300"
                    onClick={() => handleExit(vehicle)}
                  >
                    Mark as Out
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;

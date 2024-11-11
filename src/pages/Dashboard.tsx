import React from 'react';
import { useSelector } from 'react-redux';
import { selectVehicles } from '../features/vehicles/vehicleSlice';
import { Vehicle } from '../features/vehicles/types';

const Dashboard: React.FC = () => {
  const vehicles = useSelector(selectVehicles);

  // Calculate total cars parked and total slots
  const totalParked = vehicles.filter(
    (vehicle) => vehicle.status === 'In'
  ).length;
  const vehicleTypesCount = vehicles.reduce(
    (acc: Record<string, number>, vehicle: Vehicle) => {
      acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
      return acc;
    },
    {}
  );

  const parkedOverTwoHours = vehicles.filter((vehicle) => {
    if (vehicle.entryTime) {
      const entryTime = new Date(vehicle.entryTime);
      const currentTime = new Date();
      const differenceInHours =
        (currentTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60);
      return differenceInHours > 2 && vehicle.status === 'In';
    }
    return false;
  });

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h3>Total Cars Parked</h3>
          <p>{totalParked}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h3>Vehicle Type Info</h3>
          <ul>
            {Object.entries(vehicleTypesCount).map(([type, count]) => (
              <li key={type}>
                {type}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 bg-red-100 rounded shadow">
          <h3>Vehicles Parked Over 2 Hours</h3>
          <p>{parkedOverTwoHours.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

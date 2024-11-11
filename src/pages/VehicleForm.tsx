import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addVehicle } from '../features/vehicles/vehicleSlice';
import { Vehicle } from '../features/vehicles/types';
import { v4 as uuidv4 } from 'uuid';

interface VehicleFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VehicleForm: React.FC<VehicleFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    licenseNumber: '',
    vehicleType: 'Car',
    ownerName: '',
    ownerPhone: '',
    ownerAddress: '',
    status: 'In',
    entryTime: new Date().toISOString(),
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle = { ...formData, id: uuidv4() } as Vehicle;
    dispatch(addVehicle(newVehicle));
    setFormData({
      licenseNumber: '',
      vehicleType: 'Car',
      ownerName: '',
      ownerPhone: '',
      ownerAddress: '',
      status: 'In',
      entryTime: new Date().toISOString(),
    });
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // Don't render if the modal is closed

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 relative">
        <h2 className="text-2xl font-semibold mb-6 text-center">Add Vehicle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="licenseNumber"
            placeholder="License Number"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Car">Car</option>
            <option value="Microbus">Microbus</option>
            <option value="Truck">Truck</option>
          </select>
          <input
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            name="ownerPhone"
            placeholder="Owner Phone"
            value={formData.ownerPhone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="ownerAddress"
            placeholder="Address"
            value={formData.ownerAddress}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Vehicle
          </button>
        </form>

        {/* Beautiful red close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <span className="text-lg font-bold">X</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;

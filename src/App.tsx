import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './pages/Dashboard';
import VehicleForm from './pages/VehicleForm';
import VehicleList from './pages/VehicleList';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Parking Management System
          </h1>

          {/* Dashboard (First Row) */}
          <div className="grid grid-cols-1 gap-6 mb-6">
            <Dashboard />
          </div>

          {/* Button to open Vehicle Form Modal */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleOpenModal}
              className="bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-md transform transition duration-300 hover:scale-105 hover:from-teal-500 hover:to-cyan-700"
            >
              Add Vehicle
            </button>
          </div>

          {/* Vehicle Form Modal */}
          <VehicleForm isOpen={isModalOpen} onClose={handleCloseModal} />

          {/* Vehicle List Table */}
          <div className="grid grid-cols-1 gap-6">
            <VehicleList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;

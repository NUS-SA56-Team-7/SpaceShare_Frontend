import React from 'react';
import Badge from './Badge'; // Import your Badge component

const CardAppointment = ({ title, status, date }) => {
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Approved';
      case 2:
        return 'Declined';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return 'primary'; 
      case 1:
        return 'success';
      case 2:
        return 'danger';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white w-full max-w-md flex flex-col rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-md font-bold">{title}</div>
        </div>
        <div className="flex items-center space-x-4">
          <Badge status={getStatusColor(status)}>{getStatusText(status)}</Badge>
        </div>
      </div>
      <div className="mt-4 text-gray-500 font-bold text-sm">{date}</div>
    </div>
  );
};

export default CardAppointment;

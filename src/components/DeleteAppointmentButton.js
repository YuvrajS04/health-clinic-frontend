import React from 'react';
import api from '../api'; 
import '../styles.css'; 

const DeleteAppointmentButton = ({ appointmentId, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`/appointments/${appointmentId}`);
      alert(response.data.message);
      if (onDelete) {
        onDelete(appointmentId);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete the appointment. Please try again.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
    >
      Delete
    </button>
  );
};

export default DeleteAppointmentButton;

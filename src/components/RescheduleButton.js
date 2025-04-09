import React from 'react';
import api from '../api'; 
import '../styles.css'; // Import the CSS file for styling

const RescheduleButton = ({ appointmentId, onRescheduleSuccess }) => {
  const handleReschedule = async () => {
    const newAppointmentTime = prompt("Please enter the new time for the appointment (e.g., 2025-04-10T10:00:00)");

    if (!newAppointmentTime) return;

    const [appointment_date, appointment_time] = newAppointmentTime.split("T");

    try {
      const response = await api.put(`/appointments/${appointmentId}`, {
        appointment_date,  
        appointment_time,   
      });
      alert(response.data.message);
      if (onRescheduleSuccess) {
        onRescheduleSuccess(appointmentId, newAppointmentTime); 
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
      alert("Failed to reschedule the appointment. Please try again.");
    }
  };

  return (
    <button
      onClick={handleReschedule}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      Reschedule
    </button>
  );
};

export default RescheduleButton;

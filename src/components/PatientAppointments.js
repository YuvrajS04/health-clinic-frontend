import React, { useState } from 'react';
import api from '../api';
import moment from 'moment'; 
import RescheduleButton from './RescheduleButton'; 
import '../styles.css'; // Import the CSS file for styling

const PatientAppointments = () => {
  const [patientId, setPatientId] = useState('');
  const [appointments, setAppointments] = useState([]);

  const formatDate = (appointmentDate, appointmentTime) => {
    const localDate = moment(appointmentDate).local().format('YYYY-MM-DD');
    const localTime = moment(appointmentTime, 'HH:mm:ss').format('h:mm A');
    return `${localDate} at ${localTime}`;
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get(`/appointments/patient`, {
        params: { patient_id: patientId }
      });

      const updatedAppointments = res.data.map((appointment) => {
        const formattedDate = formatDate(appointment.appointment_date, appointment.appointment_time);
        return { ...appointment, formatted_date: formattedDate };
      });

      setAppointments(updatedAppointments);
    } catch (err) {
      alert('Error fetching patient appointments');
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await api.delete(`/appointments/${appointmentId}`);
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.appointment_id !== appointmentId)
      );
    } catch (err) {
      alert('Error deleting appointment');
    }
  };

  const handleRescheduleSuccess = (appointmentId, newTime) => {
    console.log(`Appointment ${appointmentId} rescheduled to ${newTime}`);
    fetchAppointments(); 
  };

  return (
    <div>
      <h2>Patient Appointments</h2>
      <input
        placeholder="Patient ID"
        onChange={e => setPatientId(e.target.value)}
      />
      <button onClick={fetchAppointments}>Get Appointments</button>

      <ul>
        {appointments.map(a => (
          <li key={a.appointment_id}>
            Doctor {a.doctor_name} on {a.formatted_date}
            <div className='button_wrapper'>
            <RescheduleButton 
              appointmentId={a.appointment_id} 
              onRescheduleSuccess={handleRescheduleSuccess} 
            />
            <button 
              onClick={() => deleteAppointment(a.appointment_id)} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointments;

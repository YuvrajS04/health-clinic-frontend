import React, { useState } from "react";
import api from "../api";
import DeleteAppointmentButton from "./DeleteAppointmentButton"; 
import RescheduleButton from "./RescheduleButton";
import moment from "moment";  
import '../styles.css'; // Import the CSS file for styling

const DoctorAppointments = () => {
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [appointments, setAppointments] = useState([]);
  
    const formatDate = (appointmentDate, appointmentTime) => {
      const localDateTime = moment(appointmentDate).local().format('YYYY-MM-DD');
      const localTime = moment(appointmentTime, 'HH:mm:ss').format('h:mm A');
      
      return `${localDateTime} at ${localTime}`;
    };
  
    const fetchAppointments = async () => {
      try {
        const res = await api.get(`/appointments/doctor/${doctorId}`, {
          params: { date },
        });
  
        const updatedAppointments = res.data.map((appointment) => {
          const formattedDate = formatDate(appointment.appointment_date, appointment.appointment_time);
          return { ...appointment, formatted_date: formattedDate };
        });
  
        setAppointments(updatedAppointments);
      } catch (err) {
        alert("Error fetching appointments");
      }
    };
  
    const handleDelete = (deletedId) => {
      setAppointments((prev) =>
        prev.filter((appointment) => appointment.appointment_id !== deletedId)
      );
    };
  
    const handleRescheduleSuccess = (id, newTime) => {
      console.log(`Appointment ${id} rescheduled to ${newTime}`);
    };
  
    return (
      <div>
        <h2>Doctor's Appointments</h2>
        <input
          placeholder="Doctor ID"
          onChange={(e) => setDoctorId(e.target.value)}
        />
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <button onClick={fetchAppointments}>Fetch</button>
  
        <ul>
          {appointments.map((a) => (
            <li key={a.appointment_id}>
              {a.formatted_date} ({a.patient_name} Patient #{a.patient_id}){" "}
              <div className="button_wrapper">
              <RescheduleButton 
                appointmentId={a.appointment_id} 
                onRescheduleSuccess={handleRescheduleSuccess} 
              />
              <DeleteAppointmentButton
                appointmentId={a.appointment_id}
                onDelete={handleDelete}  
              />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
};

export default DoctorAppointments;

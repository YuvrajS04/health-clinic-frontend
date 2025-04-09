import React from 'react';
import AppointmentForm from './components/AppointmentForm';
import DoctorAppointments from './components/DoctorAppointments';
import PatientAppointments from './components/PatientAppointments';

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Appointment Management System</h1>
      <AppointmentForm />
      <hr />
      <DoctorAppointments />
      <hr />
      <PatientAppointments />
    </div>
  );
}

export default App;

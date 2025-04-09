import React, { useState } from 'react';
import api from '../api';
import '../styles.css'; 

const AppointmentForm = () => {
  const [form, setForm] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/book-appointment', form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Error booking appointment');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Appointment</h2>
      <input
        name="patient_id"
        placeholder="Patient ID"
        onChange={handleChange}
        required
      />
      <input
        name="doctor_id"
        placeholder="Doctor ID"
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="appointment_date"
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="appointment_time"
        onChange={handleChange}
        step="1800"
        required
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600">
        Book
      </button>
    </form>
  );
};

export default AppointmentForm;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Doctor List
  const doctors = [
    "Dr. Smith - Cardiologist",
    "Dr. John - Neurologist",
    "Dr. Emily - Dentist",
    "Dr. Brown - Orthopedic",
    "Dr. Watson - Pediatrician"
  ];

  // Time Slots
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "4:00 PM"
  ];

  // Fetch appointments
  const fetchAppointments = async () => {

    const response = await fetch(
      "http://localhost:5000/appointments"
    );

    const data = await response.json();

    setAppointments(data);
  };

  useEffect(() => {

    fetchAppointments();

  }, []);

  // Add appointment
  const addAppointment = async () => {

    const newAppointment = {
      patient,
      doctor,
      date,
      time
    };

    await fetch("http://localhost:5000/appointments", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(newAppointment)

    });

    fetchAppointments();

    setPatient("");
    setDoctor("");
    setDate("");
    setTime("");
  };

  return (

    <div className="container">

      <h1>Patient Dashboard</h1>

      <input
        type="text"
        placeholder="Patient Name"
        value={patient}
        onChange={(e) => setPatient(e.target.value)}
      />

      <br /><br />

      {/* Doctor Dropdown */}

      <select
        value={doctor}
        onChange={(e) => setDoctor(e.target.value)}
        style={{
          width: "96%",
          padding: "12px",
          borderRadius: "8px"
        }}
      >

        <option value="">
          Select Doctor
        </option>

        {doctors.map((doc, index) => (

          <option key={index} value={doc}>
            {doc}
          </option>

        ))}

      </select>

      <br /><br />

      {/* Future Date Only */}

      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      {/* Time Slot Dropdown */}

      <select
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{
          width: "96%",
          padding: "12px",
          borderRadius: "8px"
        }}
      >

        <option value="">
          Select Time Slot
        </option>

        {timeSlots.map((slot, index) => (

          <option key={index} value={slot}>
            {slot}
          </option>

        ))}

      </select>

      <br /><br />

      <button onClick={addAppointment}>
        Add Appointment
      </button>

      <br /><br />

      <button onClick={() => navigate("/")}>
        Logout
      </button>

      <br /><br />

      <table border="1" style={{ margin: "auto" }}>

        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Date</th>
          <th>Time</th>
        </tr>

        {appointments.map((item, index) => (

          <tr key={index}>
            <td>{item.patient}</td>
            <td>{item.doctor}</td>
            <td>{item.date}</td>
            <td>{item.time}</td>
          </tr>

        ))}

      </table>

    </div>
  );
}

export default Dashboard;
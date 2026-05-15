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

  // ================= FETCH APPOINTMENTS =================

  const fetchAppointments = async () => {

    try {

      const response = await fetch(
        "https://hospital-project-rzlo.onrender.com/appointments"
      );

      const data = await response.json();

      setAppointments(data);

    } catch (error) {

      console.error("Error Fetching Appointments:", error);

      alert("Failed to load appointments");

    }
  };

  useEffect(() => {

    fetchAppointments();

  }, []);

  // ================= ADD APPOINTMENT =================

  const addAppointment = async () => {

    // Validation
    if (!patient || !doctor || !date || !time) {

      alert("Please fill all fields");

      return;
    }

    const newAppointment = {
      patient,
      doctor,
      date,
      time
    };

    try {

      await fetch(
        "https://hospital-project-rzlo.onrender.com/appointments",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(newAppointment)

        }
      );

      alert("Appointment Added Successfully");

      fetchAppointments();

      // Clear Form
      setPatient("");
      setDoctor("");
      setDate("");
      setTime("");

    } catch (error) {

      console.error("Error Adding Appointment:", error);

      alert("Failed to add appointment");

    }
  };

  return (

    <div className="container">

      <h1>Patient Dashboard</h1>

      {/* Patient Name */}

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

      {/* Add Appointment Button */}

      <button onClick={addAppointment}>
        Add Appointment
      </button>

      <br /><br />

      {/* Logout Button */}

      <button onClick={() => navigate("/")}>
        Logout
      </button>

      <br /><br />

      {/* Appointment Table */}

      <table
        border="1"
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "90%"
        }}
      >

        <thead>

          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Time</th>
          </tr>

        </thead>

        <tbody>

          {appointments.length > 0 ? (

            appointments.map((item, index) => (

              <tr key={index}>

                <td>{item.patient}</td>
                <td>{item.doctor}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>

              </tr>

            ))

          ) : (

            <tr>

              <td colSpan="4">
                No Appointments Available
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Dashboard;
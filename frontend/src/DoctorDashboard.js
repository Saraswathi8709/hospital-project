import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

  // Fetch Appointments from Backend
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

  // Load data when page opens
  useEffect(() => {

    fetchAppointments();

  }, []);

  return (

    <div className="container">

      <h1>Doctor Dashboard</h1>

      <h2>Patient Appointments</h2>

      {/* Logout Button */}
      <button onClick={() => navigate("/")}>
        Logout
      </button>

      <br /><br />

      {/* Appointments Table */}
      <table
        border="1"
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          width: "80%"
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
                No Appointments Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default DoctorDashboard;
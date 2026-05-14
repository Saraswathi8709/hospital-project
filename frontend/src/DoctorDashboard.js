import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DoctorDashboard() {

  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);

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

  return (

    <div className="container">

      <h1>Doctor Dashboard</h1>

      <h2>Patient Appointments</h2>

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

export default DoctorDashboard;
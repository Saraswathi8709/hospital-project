import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const response = await fetch(
        "https://hospital-project-rzlo.onrender.com/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      // Patient Login
      if (data.role === "patient") {

        alert("Patient Login Successful");

        navigate("/patient-dashboard");

      }

      // Doctor Login
      else if (data.role === "doctor") {

        alert("Doctor Login Successful");

        navigate("/doctor-dashboard");

      }

      // Invalid Login
      else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.error("Login Error:", error);

      alert("Server Error");

    }
  };

  return (

    <div className="container">

      <h1>Hospital Management System</h1>

      <h2>Login Page</h2>

      <input
        type="text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

      <p><b>Patient Login:</b> patient / 1234</p>

      <p><b>Doctor Login:</b> doctor / 1234</p>

    </div>

  );
}

export default Login;
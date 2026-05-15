import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from './Login';
import Dashboard from './Dashboard';
import DoctorDashboard from './DoctorDashboard';

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Patient Dashboard */}
        <Route
          path="/patient-dashboard"
          element={<Dashboard />}
        />

        {/* Doctor Dashboard */}
        <Route
          path="/doctor-dashboard"
          element={<DoctorDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
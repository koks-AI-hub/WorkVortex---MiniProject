import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EmployeeProfile from "./Employee/EmployeeProfile";
// import EmployeeJobs from "./Employee/EmployeeJobs";
// import EmployeeApplications from "./Employee/EmployeeApplications";
import "../style/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      <Sidebar userType="Employee" />
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<EmployeeProfile />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

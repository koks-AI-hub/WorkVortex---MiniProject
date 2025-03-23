import Sidebar from "../components/Sidebar";
import "../style/EmployeeDashboard.css";

const EmployeeDashboard = () => {
  return (
    <div className="employee-dashboard">
      <Sidebar userType="Employee" />
      {/* <div className="dashboard-content">
        <h1>Welcome, Employee</h1>
        <p>Explore job opportunities, manage your profile, and track applications.</p>

        <div className="dashboard-sections">
          <div className="dashboard-card">
            <h2>Job Feed</h2>
            <p>Browse the latest job opportunities tailored for you.</p>
            <button className="dashboard-btn">View Jobs</button>
          </div>
          <div className="dashboard-card">
            <h2>Applications</h2>
            <p>Monitor the status of your applications in real-time.</p>
            <button className="dashboard-btn">Check Applications</button>
          </div>
          <div className="dashboard-card">
            <h2>Profile</h2>
            <p>Keep your details updated and manage uploaded documents.</p>
            <button className="dashboard-btn">Edit Profile</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default EmployeeDashboard;

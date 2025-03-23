import Sidebar from "../components/Sidebar";
import "../style/CompanyDashboard.css";

const CompanyDashboard = () => {
  return (
    <div className="company-dashboard">
      <Sidebar userType="Company" />
      {/* <div className="dashboard-content">
        <h1>Welcome, Company</h1>
        <p>Post jobs, manage applicants, and track your employees.</p>

        <div className="dashboard-sections">
          <div className="dashboard-card">
            <h2>Post a Job</h2>
            <p>Create job openings to attract top talent.</p>
            <button className="dashboard-btn">Create Job</button>
          </div>
          <div className="dashboard-card">
            <h2>Manage Applications</h2>
            <p>Review and process applications from potential employees.</p>
            <button className="dashboard-btn">View Applications</button>
          </div>
          <div className="dashboard-card">
            <h2>Search Workers</h2>
            <p>Find skilled workers that match your company's needs.</p>
            <button className="dashboard-btn">Find Workers</button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CompanyDashboard;

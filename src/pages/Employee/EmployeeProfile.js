import { useState } from "react";
import "../../style/EmployeeProfile.css";
import SkillsExperience from "./SkillsExperience";
import BasicInfo from "./BasicInfo";
import DocumentsTab from "./DocumentsTab";

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="profile-container">
      <h1>Profile Management</h1>

      <div className="tabs">
        <button className={activeTab === "basic" ? "active" : ""} onClick={() => setActiveTab("basic")}>
          Basic Info
        </button>
        <button className={activeTab === "experience" ? "active" : ""} onClick={() => setActiveTab("experience")}>
          Skills & Experience
        </button>
        <button className={activeTab === "documents" ? "active" : ""} onClick={() => setActiveTab("documents")}>
          Documents
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "basic" && (
          <div className="tab-panel">
            <BasicInfo/>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="tab-panel">
           <SkillsExperience />
          </div>
        )}

        {activeTab === "documents" && (
          <div className="tab-panel">
            <DocumentsTab />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;

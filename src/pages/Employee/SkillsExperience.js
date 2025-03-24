import { useState, useEffect } from "react";
import "../../style/SkillsExperience.css";
import { listenToEmployeeData, storeEmployeeData } from "../../services/firebaseEmployeeService";

const SkillsExperience = () => {
  const employeeId = sessionStorage.getItem("userPhone"); // Use phone number as unique ID
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    years: "",
    salary: "",
    remarks: "",
  });

  // Real-Time Listener for Skills and Experience
  useEffect(() => {
    if (employeeId) {
      const unsubscribe = listenToEmployeeData(employeeId, (data) => {
        if (data) {
          setSkills(data.skills || []);
          setExperiences(data.experiences || []);
        }
      });
      return () => unsubscribe(); // Cleanup listener on component unmount
    }
  }, [employeeId]);

  // Add Skill
  const addSkill = async () => {
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill !== "" && !skills.includes(trimmedSkill)) {
      const updatedSkills = [...skills, trimmedSkill];
      setSkills(updatedSkills);
      setSkillInput("");

      // Save updated skills to Firebase
      try {
        await storeEmployeeData(employeeId, { skills: updatedSkills });
      } catch (error) {
        console.error("Error saving skills:", error);
      }
    }
  };

  // Remove Skill
  const removeSkill = async (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);

    // Save updated skills to Firebase
    try {
      await storeEmployeeData(employeeId, { skills: updatedSkills });
    } catch (error) {
      console.error("Error removing skill:", error);
    }
  };

  // Handle Experience Input Change
  const handleExperienceChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  // Add Experience
  const addExperience = async () => {
    if (!newExperience.role || !newExperience.company || !newExperience.years) {
      alert("Please fill in all required fields (Role, Company, Years).");
      return;
    }

    const updatedExperiences = [...experiences, newExperience];
    setExperiences(updatedExperiences);
    setNewExperience({ role: "", company: "", years: "", salary: "", remarks: "" });
    setShowModal(false);

    // Save updated experiences to Firebase
    try {
      await storeEmployeeData(employeeId, { experiences: updatedExperiences });
    } catch (error) {
      console.error("Error saving experiences:", error);
    }
  };

  return (
    <div className="skills-experience-container">
      {/* Skills Section */}
      <div className="skills-section">
        <h3>Skills</h3>
        <div className="skills-input">
          <input
            type="text"
            placeholder="Enter a skill..."
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <button onClick={addSkill}>Add</button>
        </div>
        <div className="skills-list">
          {skills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill} <button onClick={() => removeSkill(skill)}>✖</button>
            </span>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="experience-section">
        <h3>Work Experience</h3>
        <button className="add-experience-btn" onClick={() => setShowModal(true)}>
          + Add Experience
        </button>
        <table className="experience-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Company</th>
              <th>Years</th>
              <th>Salary</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {experiences.length > 0 ? (
              experiences.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.role}</td>
                  <td>{exp.company}</td>
                  <td>{exp.years}</td>
                  <td>{exp.salary}</td>
                  <td>{exp.remarks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No Experience Added</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Experience Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input type="text" name="role" placeholder="Role" value={newExperience.role} onChange={handleExperienceChange} />
            <input type="text" name="company" placeholder="Company Name" value={newExperience.company} onChange={handleExperienceChange} />
            <input type="number" name="years" placeholder="Years of Experience" value={newExperience.years} onChange={handleExperienceChange} />
            <input type="text" name="salary" placeholder="Salary (Optional)" value={newExperience.salary} onChange={handleExperienceChange} />
            <textarea name="remarks" placeholder="Remarks (Optional)" value={newExperience.remarks} onChange={handleExperienceChange}></textarea>
            <div className="modal-actions">
              <button onClick={addExperience}>Save</button>
              <button className="close-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsExperience;

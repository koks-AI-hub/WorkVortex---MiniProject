import { useState } from "react";
import "../../style/SkillsExperience.css";

const SkillsExperience = () => {
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

  // Add Skill
  const addSkill = () => {
    if (skillInput.trim() !== "" && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput("");
    }
  };

  // Remove Skill
  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // Handle Experience Input Change
  const handleExperienceChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  // Add Experience
  const addExperience = () => {
    if (newExperience.role && newExperience.company && newExperience.years) {
      setExperiences([...experiences, newExperience]);
      setNewExperience({ role: "", company: "", years: "", salary: "", remarks: "" });
      setShowModal(false);
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

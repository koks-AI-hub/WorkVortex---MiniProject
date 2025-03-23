import { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import "../../style/DocumentsTab.css";

const DocumentsTab = () => {
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setDocuments([...documents, file]);
    }
  };

  const handleDelete = (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setDocuments(updatedDocs);
  };

  return (
    <div className="documents-tab">
      <h2>Upload Documents</h2>
      <p>Upload your certificates, mark sheets, and other required documents.</p>

      <div className="upload-section">
        <label className="upload-btn">
          <FaUpload /> Upload File
          <input type="file" accept=".png,.jpg,.jpeg,.pdf" onChange={handleFileUpload} />
        </label>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <p className="no-docs">No documents uploaded yet.</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} className="document-card">
              {doc.type.includes("image") ? (
                <img src={URL.createObjectURL(doc)} alt="Uploaded File" className="doc-preview" />
              ) : (
                <p className="doc-name">{doc.name}</p>
              )}
              <button className="delete-btn" onClick={() => handleDelete(index)}>
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DocumentsTab;

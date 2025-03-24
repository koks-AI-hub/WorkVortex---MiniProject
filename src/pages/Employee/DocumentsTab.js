import { useState, useEffect } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";
import "../../style/DocumentsTab.css";
import { uploadDocumentToSupabase, storeEmployeeData, retrieveEmployeeData } from "../../services/firebaseEmployeeService";

const DocumentsTab = () => {
  const employeeId = sessionStorage.getItem("userPhone"); // Use phone number as unique ID
  const [documents, setDocuments] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [documentFile, setDocumentFile] = useState(null);

  // Fetch documents from Firestore on component mount
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await retrieveEmployeeData(employeeId);
        if (data && data.documents) {
          setDocuments(data.documents);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, [employeeId]);

  // Handle document upload
  const handleDocumentUpload = async () => {
    if (!documentName.trim() || !documentFile) {
      alert("Please provide a document name and select a file.");
      return;
    }

    try {
      // Upload the document to Supabase
      const downloadUrl = await uploadDocumentToSupabase(employeeId, documentFile, documentName);

      // Save the document metadata in Firestore
      const updatedDocuments = [...documents, { name: documentName, url: downloadUrl }];
      setDocuments(updatedDocuments);
      await storeEmployeeData(employeeId, { documents: updatedDocuments });

      // Reset input fields
      setDocumentName("");
      setDocumentFile(null);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  // Handle document deletion
  const handleDelete = async (index) => {
    const updatedDocs = [...documents];
    updatedDocs.splice(index, 1);
    setDocuments(updatedDocs);

    // Update Firestore
    try {
      await storeEmployeeData(employeeId, { documents: updatedDocs });
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <div className="documents-tab">
      <h2>Upload Documents</h2>
      <p>Upload your certificates, mark sheets, and other required documents.</p>

      <div className="upload-section">
        <input
          type="text"
          placeholder="Enter document name..."
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <label className="upload-btn">
          <FaUpload /> Upload File
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => setDocumentFile(e.target.files[0])}
          />
        </label>
        <button onClick={handleDocumentUpload}>Upload</button>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <p className="no-docs">No documents uploaded yet.</p>
        ) : (
          documents.map((doc, index) => (
            <div key={index} className="document-card">
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="doc-link">
                {doc.name}
              </a>
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

import React, { useEffect, useState } from "react";
import api from "../api";

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    api.get("/applications")
      .then(res => setApplications(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 Function must be here, NOT inside return
  const updateStatus = (index, status) => {
    api.put("/update-status", { index, status })
  .then(() => {
    api.get("/applications")
      .then(res => setApplications(res.data));
  })

      .catch(err => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Applications</h2>

      {applications.map((app, index) => (
        <div key={index} style={{
          border: "1px solid #ddd",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px"
        }}>
          <h4>{app.title}</h4>
          <p><b>Company:</b> {app.company}</p>
          <p><b>Status:</b> {app.status}</p>
          <ul>
  {app.history?.map((h, i) => (
    <li key={i}>{h.status} - {new Date(h.date).toLocaleString()}</li>
  ))}
</ul>


          <button onClick={() => updateStatus(index, "Interview")}>Interview</button>
          <button onClick={() => updateStatus(index, "Offer")}>Offer</button>
          <button onClick={() => updateStatus(index, "Rejected")}>Rejected</button>
        </div>
      ))}

    </div>
  );
  
}

export default Applications;

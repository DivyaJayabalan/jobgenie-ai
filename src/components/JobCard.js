import api from "./api";
import React from "react";

function JobCard({ title, company, location, score }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h3>{title}</h3>
      <p><b>Company:</b> {company}</p>
      <p><b>Location:</b> {location}</p>
      <p><b>Match Score:</b> {score}%</p>
      <button
  onClick={() => {
    api.post("/apply", {
      title,
      company,
      location,
      score
    }).then(() => alert("Application Saved!"));
  }}
  style={{
    padding: "8px 12px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "5px"
  }}
>
  Apply
</button>

    </div>
  );
}

export default JobCard;

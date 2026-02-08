import axios from "axios";
import React from "react";

function JobCard({ title, company, location, score }) {

  const getBadgeColor = () => {
    if (score > 70) return "green";
    if (score >= 40) return "orange";
    return "gray";
  };

  const handleApply = () => {
    // Open external job page (simulated)
    window.open("https://example.com", "_blank");

    // After user returns, ask confirmation
    setTimeout(() => {
      const confirmApply = window.confirm(
        `Did you apply for ${title} at ${company}?`
      );

      if (confirmApply) {
        axios.post("http://localhost:5000/apply", {
          title,
          company,
          location,
          score,
          status: "Applied"
        }).then(() => alert("Application Saved!"));
      }
    }, 2000);
  };

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "15px",
      marginBottom: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      background: "white"
    }}>
      <h3>{title}</h3>
      <p><b>Company:</b> {company}</p>
      <p><b>Location:</b> {location}</p>

      {/* Score Badge */}
      <div style={{ marginBottom: "8px" }}>
        <span style={{
          background: getBadgeColor(),
          color: "white",
          padding: "4px 8px",
          borderRadius: "5px",
          fontWeight: "bold"
        }}>
          Match Score: {score}%
        </span>
      </div>

      {/* Match Explanation */}
      <p style={{ fontSize: "12px", color: "#555", marginBottom: "10px" }}>
        Skills matched with your resume
      </p>

      {/* Apply Button */}
      <button
        onClick={handleApply}
        style={{
          padding: "8px 12px",
          background: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default JobCard;

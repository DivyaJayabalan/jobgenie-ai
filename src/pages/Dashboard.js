import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import ChatBox from "../components/ChatBox";

function Dashboard({ dark }) {
  const [resumeSkills, setResumeSkills] = useState(["React", "JavaScript"]);
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [resumeScore, setResumeScore] = useState(0);
  const [resumeText, setResumeText] = useState(localStorage.getItem("resume") || "");
  const [workMode, setWorkMode] = useState("all");
  const [minScore, setMinScore] = useState(0);

  const filteredJobs = jobs.filter(job =>
  (job.title.toLowerCase().includes(search.toLowerCase()) ||
   job.company.toLowerCase().includes(search.toLowerCase())) &&
  (workMode === "all" || job.location.toLowerCase().includes(workMode)) &&
  job.score >= minScore
);



  const bestMatches = search
    ? [...filteredJobs].sort((a, b) => b.score - a.score).slice(0, 2)
    : [...jobs].sort((a, b) => b.score - a.score).slice(0, 2);
    useEffect(() => {
  if (jobs.length === 0) return;

  const totalScore = jobs.reduce((sum, job) => sum + job.score, 0);
  const avgScore = Math.round(totalScore / jobs.length);
  setResumeScore(avgScore);
}, [jobs]);


  useEffect(() => {
    axios.post("http://localhost:5000/jobs", { resumeSkills })
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, [resumeSkills]);

  const handleResumeUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result.toLowerCase();
      const skills = [];

      if (text.includes("react")) skills.push("React");
      if (text.includes("javascript")) skills.push("JavaScript");
      if (text.includes("node")) skills.push("Node.js");
      if (text.includes("mongodb")) skills.push("MongoDB");

      setResumeSkills(skills);
      alert("Resume analyzed! Skills updated.");
    };

    reader.readAsText(file);
    reader.onload = (event) => {
  const text = event.target.result.toLowerCase();
  localStorage.setItem("resume", text);
  setResumeText(text);
};

  };

  return (
    
<div style={{
  padding: "20px",
  minHeight: "100vh",
  background: dark ? "#1e293b" : "#f8fafc",
  color: dark ? "white" : "black"
}}>

      {/* Upload Resume */}
      <div style={{
  background: "#e0f2fe",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px"
}}>
  <b>Resume Strength Score:</b> {resumeScore}%
</div>

      <label
        style={{
          padding: "10px 15px",
          background: "#10b981",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
          display: "inline-block",
          marginBottom: "15px"
        }}
      >
        Upload Resume
        <input
          type="file"
          accept=".txt,.pdf"
          hidden
          onChange={(e) => handleResumeUpload(e.target.files[0])}
        />
      </label>

      {/* Search */}
      <input
        type="text"
        placeholder="Search job title or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "300px",
          padding: "8px",
          marginBottom: "15px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <h3>⭐ Best Matches</h3>
      {bestMatches.map(job => (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          score={job.score}
        />
      ))}

      <hr />

      <h2>All Jobs</h2>
      {filteredJobs.map(job => (
        <JobCard
          key={job.id}
          title={job.title}
          company={job.company}
          location={job.location}
          score={job.score}
        />
      ))}

      <ChatBox
  setSearch={setSearch}
  setWorkMode={setWorkMode}
  setMinScore={setMinScore}
/>

    </div>
    
  );
  
}

export default Dashboard;

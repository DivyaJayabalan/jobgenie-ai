import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";

function App() {

  // 🔥 Hook must be here
  const [dark, setDark] = React.useState(false);

  return (
    <Router>
      <div style={{
        display: "flex",
        background: dark ? "#0f172a" : "#f8fafc",
        color: dark ? "white" : "black"
      }}>

        {/* Sidebar */}
        <div style={{
          width: "220px",
          background: "#0f172a",
          color: "white",
          padding: "20px",
          minHeight: "100vh"
        }}>
          <h2>JobGenie</h2>

          {/* Dark Mode Button */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              marginBottom: "20px",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
          </button>

          <p>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Jobs
            </Link>
          </p>

          <p>
            <Link to="/applications" style={{ color: "white", textDecoration: "none" }}>
              My Applications
            </Link>
          </p>
        </div>

        {/* Pages */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard dark={dark} />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;

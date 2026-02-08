import React, { useState } from "react";

function ChatBox({ setSearch, setWorkMode, setMinScore }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.toLowerCase();

    if (text.includes("react")) setSearch("react");
    if (text.includes("remote")) setWorkMode("remote");
    if (text.includes("high match")) setMinScore(70);
    if (text.includes("clear")) {
      setSearch("");
      setWorkMode("all");
      setMinScore(0);
    }

    setMessage("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      background: "white",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
    }}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask AI..."
        style={{ padding: "5px" }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatBox;

import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (email === "test@gmail.com" && pass === "test@123") {
      localStorage.setItem("user", email);
      window.location.href = "/";
    } else {
      alert("Wrong credentials");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div style={{ padding: "20px", border: "1px solid #ccc" }}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} /><br/><br/>
        <input type="password" placeholder="Password" onChange={e => setPass(e.target.value)} /><br/><br/>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;

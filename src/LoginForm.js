import React, { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(username, password) {
    // Fake login API that returns a promise that resolves to a JSON object
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if username and password match the expected values
        if (username === "kminchelle" && password === "0lelplR") {
          resolve({ status: "success" });
        } else {
          reject(new Error("Invalid username or password"));
        }
      }, 1000);
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "kminchelle",
        password: "0lelplR"
        // expiresInMins: 60, // optional
      })
    })
      .then((res) => res.json())
      .then(console.log);
    try {
      // Validate username and password here
      // If valid, call login API
      const response = await login(username, password);
      if (response.status === "success") {
        console.log(response.status);
      } else {
        // If login fails, set error message
        setError("Error logging in: " + response.error);
      }
    } catch (err) {
      // If login fails, set error message
      setError("Error logging in: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      {error && <span>{error}</span>}
      <br />
      <button type="submit">Log in</button>
    </form>
  );
}

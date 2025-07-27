// frontend/src/AddNote.js
import React, { useState } from "react";
import axios from "axios";

function AddNote({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) return;

    axios
      .post("http://localhost:8000/notes", { title, content })
      .then((response) => {
        onAdd(response.data);
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Error creating note:", error));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        maxWidth: "500px",
        margin: "20px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        Add New Note
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          backgroundColor: "#007bff",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Add Note
      </button>
    </form>
  );
}

export default AddNote;

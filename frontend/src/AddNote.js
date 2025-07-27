// frontend/src/AddNote.js
import React, { useState } from "react";
import axios from "axios";

function AddNote({ onAdd }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title && !content) return; // basic validation
    axios
      .post("http://localhost:8000/notes", { title, content })
      .then((response) => {
        onAdd(response.data); // add the new note to list
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Error creating note:", error));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <br />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default AddNote;

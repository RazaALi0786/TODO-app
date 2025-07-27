// frontend/src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // you can style as you like
import AddNote from "./AddNote";
import NotesList from "./NotesList";
function App() {
  const [notes, setNotes] = useState([]);

  // Fetch notes from backend when component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Add a note locally after creation
  const addNote = (note) => {
    setNotes((prev) => [...prev, note]);
  };

  return (
    <div className="App">
      <h1>My Notes</h1>
      <AddNote onAdd={addNote} />
      <NotesList notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;

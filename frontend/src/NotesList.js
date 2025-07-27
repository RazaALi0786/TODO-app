import React from "react";
import axios from "axios";

function NotesList({ notes, setNotes }) {
  const deleteNote = (id) => {
    axios
      .delete(`http://localhost:8000/notes/${id}`)
      .then(() => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  const toggleCompleted = (id) => {
    axios
      .put(`http://localhost:8000/notes/${id}/toggle`)
      .then((res) => {
        setNotes((prev) =>
          prev.map((note) =>
            note.id === id ? { ...note, completed: res.data.completed } : note
          )
        );
      })
      .catch((error) => console.error("Error toggling completed:", error));
  };

  return (
    <div style={styles.container}>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            ...styles.card,
            backgroundColor: note.completed ? "#e6ffee" : "#fff",
            opacity: note.completed ? 0.7 : 1,
          }}
        >
          <div style={styles.header}>
            <input
              type="checkbox"
              checked={note.completed}
              onChange={() => toggleCompleted(note.id)}
              style={styles.checkbox}
            />
            <h3
              style={{
                ...styles.title,
                textDecoration: note.completed ? "line-through" : "none",
                color: note.completed ? "gray" : "#333",
              }}
            >
              {note.title}
            </h3>
          </div>
          <p style={styles.content}>{note.content}</p>
          <p style={styles.timestamp}>
            Created: {new Date(note.created_at).toLocaleString()}
          </p>
          <button onClick={() => deleteNote(note.id)} style={styles.button}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "1rem",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
  },
  checkbox: {
    marginRight: "10px",
  },
  title: {
    margin: 0,
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  content: {
    margin: "8px 0",
    fontSize: "1rem",
  },
  timestamp: {
    fontSize: "0.8rem",
    color: "#888",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default NotesList;

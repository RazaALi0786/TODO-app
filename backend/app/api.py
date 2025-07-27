from fastapi import FastAPI, HTTPException
#✅ FastAPI → The framework you're using.
from fastapi.middleware.cors import CORSMiddleware
#✅ CORS Middleware → To handle Cross-Origin Resource Sharing, allowing your React app to communicate with the FastAPI backend.
from datetime import datetime


app = FastAPI()

# This creates the FastAPI app object.
# This is required. Uvicorn needs this to run the API.

# Allow calls from our React dev server (default port 3000) – change if needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React runs on 3000 by default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Why? React runs on localhost:3000. Your FastAPI is on localhost:8000.
# Browsers block this by default (CORS policy). This allows them to talk to each other.

@app.get("/")
def read_root():
    return {"message": "Welcome to the Notes API!"}

# Simple sanity check route.
# Go to: http://localhost:8000/


from typing import List
from app.schemas import Note, NoteCreate

# In-memory "database"
notes = []
next_id = 1  # simple auto-increment id

def find_note(note_id: int):
    for note in notes:
        if note["id"] == note_id:
            return note
    return None
# backend/app/api.py (continued)

@app.get("/notes", response_model=List[Note])
def get_all_notes():
    return notes

@app.get("/notes/{note_id}", response_model=Note)
def get_note(note_id: int):
    """Return a single note by ID."""
    note = find_note(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

# backend/app/api.py (continued)

@app.post("/notes", status_code=201, response_model=Note)
def create_note(note: NoteCreate):
    """Create a new note."""
    global next_id
    note_data = note.dict()           # convert Pydantic model to dict
    note_data["id"] = next_id
    note_data["created_at"] = datetime.now()
    next_id += 1
    notes.append(note_data)
    return note_data


@app.put("/notes/{note_id}/toggle", response_model=Note)
def toggle_note_completed(note_id: int):
    note = find_note(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    note["completed"] = not note.get("completed", False)
    return note

# backend/app/api.py (continued)

@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: int, updated: NoteCreate):
    """Update an existing note."""
    note = find_note(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    note["title"] = updated.title
    note["content"] = updated.content
    return note

# backend/app/api.py (continued)

@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int):
    """Delete a note."""
    note = find_note(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    notes.remove(note)
    return None  # 204 No Content

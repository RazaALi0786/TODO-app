# backend/app/schemas.py
from pydantic import BaseModel
from datetime import datetime

class NoteBase(BaseModel):
    title: str
    content: str
    completed: bool = False  # New field

class NoteCreate(NoteBase):
    pass

class Note(NoteBase):
    id: int
    created_at: datetime
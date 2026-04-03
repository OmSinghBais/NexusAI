from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import urllib.request
import urllib.parse
import json
import base64

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# --- Database Setup (SQLite + SQLAlchemy) ---
DATABASE_URL = "sqlite:///./cams.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class SongModel(Base):
    __tablename__ = "songs"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    play_count = Column(Integer, default=0)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Data Models (Pydantic) ---
# --- Data Models (Pydantic) ---
class StreamMetadata(BaseModel):
    codec: str = "N/A"
    bitrate: str = "N/A"
    latency: str = "N/A"
    encryption: str = "N/A"
    factory_model: str = "N/A"
    buffer: str = "N/A"

class PlayerState(BaseModel):
    current_song: Optional[str] = None
    is_playing: bool = False
    mode: str = "NORMAL"
    metadata: Optional[StreamMetadata] = None

class StatusResponse(BaseModel):
    state: PlayerState
    message: str

class SongResponse(BaseModel):
    filename: str
    play_count: int

    class Config:
        from_attributes = True

class PlaylistResponse(BaseModel):
    playlist: List[SongResponse]

# --- In-Memory State for current active player ---
class ActiveState:
    state = PlayerState()

# --- Initialize App ---
app = FastAPI(title="CAMS+ Media Backend API (Enterprise Edition)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed initial database if empty
def seed_database():
    db = SessionLocal()
    if db.query(SongModel).count() == 0:
        default_songs = ["lofi.mp3", "gym.mp4", "focus.mp3"]
        for s in default_songs:
            db.add(SongModel(filename=s, play_count=0))
        db.commit()
    db.close()

seed_database()

# --- Routes ---
@app.get("/", tags=["Health"])
def health_check():
    return {"status": "ok", "message": "CAMS+ Enterprise Backend Running!"}

@app.get("/status", response_model=StatusResponse, tags=["Player"])
def get_current_status():
    return StatusResponse(state=ActiveState.state, message="Retrieved current state.")

@app.get("/playlist", response_model=PlaylistResponse, tags=["Playlist"])
def get_playlist(db: Session = Depends(get_db)):
    songs = db.query(SongModel).all()
    return PlaylistResponse(playlist=songs)

@app.post("/play/{file}", response_model=StatusResponse, tags=["Player"])
def play_media(file: str, db: Session = Depends(get_db)):
    """Play a media file and increment its play count in SQLite."""
    # Find song or create it
    song = db.query(SongModel).filter(SongModel.filename == file).first()
    if not song:
        song = SongModel(filename=file, play_count=1)
        db.add(song)
    else:
        song.play_count += 1
        
    db.commit()
    
    # Assign Abstract Factory Context Metadata
    if file.endswith(".mp4") or "video" in file.lower():
        meta = StreamMetadata(
            codec="H.265 (HEVC Vector)",
            bitrate="15.2 Mbps",
            latency="24ms",
            encryption="AES-256",
            factory_model="AV-Engine-X2",
            buffer="Optimized"
        )
    else:
        meta = StreamMetadata(
            codec="FLAC 24-bit (Acoustic)",
            bitrate="1411 kbps",
            latency="8ms",
            encryption="RSA-4096",
            factory_model="Acoustic-Engine-X1",
            buffer="Lossless"
        )
    
    ActiveState.state.current_song = file
    ActiveState.state.is_playing = True
    ActiveState.state.metadata = meta
    
    return StatusResponse(state=ActiveState.state, message=f"Now playing: {file}")

@app.post("/pause", response_model=StatusResponse, tags=["Player"])
def pause_media():
    if not ActiveState.state.current_song:
        raise HTTPException(status_code=400, detail="Nothing is playing.")
    ActiveState.state.is_playing = False
    return StatusResponse(state=ActiveState.state, message="Playback paused.")

@app.post("/resume", response_model=StatusResponse, tags=["Player"])
def resume_media():
    if not ActiveState.state.current_song:
        raise HTTPException(status_code=400, detail="Nothing to resume.")
    ActiveState.state.is_playing = True
    return StatusResponse(state=ActiveState.state, message="Playback resumed.")

@app.post("/mode/{mode}", response_model=StatusResponse, tags=["Player"])
def set_mode(mode: str):
    ActiveState.state.mode = mode.upper()
    return StatusResponse(state=ActiveState.state, message=f"Mode set to {mode.upper()}.")

@app.get("/spotify/token", tags=["External APIs"])
def get_spotify_token():
    client_id = "8e1e513cce6a4b93a921be7f487a95c5"
    client_secret = "9986cf0752c54742bf33c553c7541074"
    auth_string = f"{client_id}:{client_secret}"
    auth_b64 = base64.b64encode(auth_string.encode("utf-8")).decode("utf-8")
    
    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": f"Basic {auth_b64}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode("utf-8")
    
    req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode("utf-8"))
            return {"access_token": result.get("access_token")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch Spotify token: {str(e)}")
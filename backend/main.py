from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
from tensorflow.image import resize # type: ignore
import librosa
import numpy as np
import uvicorn
import os
from datetime import datetime
import json
from typing import Dict, List

title = "Caffmusic"
desc = "API for machine learning Music Genre Recognition"
app = FastAPI(title=title, description=desc)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictResponse(BaseModel):
    final_prediction: str
    confidence: float
    chunk_predictions: Dict[str, float]   # Dict of genre: confidence
    prediction_id: str
    timestamp: str


class HistoryItem(BaseModel):
    prediction_id: str
    filename: str
    final_prediction: str
    confidence: float
    timestamp: str


# Configurations
MODEL_PATH = "model/Music_Genre_Classification.h5"
TEMP_UPLOAD_DIR = "temp_uploads"
HISTORY_FILE = "prediction_history.json"
GENRES = ["blues", "classical", "country", "disco",
          "hiphop", "jazz", "metal", "pop", "reggae", "rock"]

# Create Dictionaries
if not os.path.exists(HISTORY_FILE):
    with open(HISTORY_FILE, "w") as f:
        json.dump([], f)

if not os.path.exists(TEMP_UPLOAD_DIR):
    os.makedirs(TEMP_UPLOAD_DIR, exist_ok=True)

model = None
try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Error loading model: {e}")

# Preprocessing Functions


def preprocess_audio(file_path, target_shape=(150, 150)):
    try:
        audio_data, sample_rate = librosa.load(file_path, sr=None)

        chunk_duration = 4
        overlap_duration = 2
        chunk_sample = chunk_duration * sample_rate
        overlap_sample = overlap_duration * sample_rate

        tot_chunk = int(np.ceil((len(audio_data) - chunk_sample) /
                        (chunk_sample - overlap_sample))) + 1

        chunks = []

        for i in range(tot_chunk):
            start = i * (chunk_sample - overlap_sample)
            end = start + chunk_sample
            chunk = audio_data[start:end]

            if len(chunk) < chunk_sample:
                chunk = np.pad(
                    chunk, (0, chunk_sample - len(chunk)), 'constant')

            mel_spectrogram = librosa.feature.melspectrogram(
                y=chunk, sr=sample_rate, n_mels=128)

            mel_spectrogram = resize(
                np.expand_dims(mel_spectrogram, axis=-1), target_shape)

            chunks.append(mel_spectrogram)

        return np.array(chunks)
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing audio: {str(e)}")


def predict_genres(audio_chunks):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")

    chunk_predictions = model.predict(audio_chunks)
    pred_categories = np.argmax(chunk_predictions, axis=1)

    # Count for each genre
    genre_count = {}
    for genre in GENRES:
        genre_count[genre] = 0

    unique_preds, counts = np.unique(pred_categories, return_counts=True)
    for genre_idx, count in zip(unique_preds, counts):
        genre_count[GENRES[genre_idx]] = (count / len(pred_categories)) * 100

    # Get majority prediction
    majority_idx = unique_preds[counts == np.max(counts)][0]
    confidence = np.max(counts) / len(pred_categories)

    return GENRES[majority_idx], confidence, genre_count


@app.post("/predict", response_model=PredictResponse)
async def predict_audio(file: UploadFile = File(...)):
    if not file.filename.endswith(('.mp3', '.wav')):
        raise HTTPException(
            status_code=400, detail="Invalid file format, Only MP3 and WAV files are supported")

    # Generate prediction ID and save file temporarily
    prediction_id = datetime.now().strftime("%d%m%Y_%H%M%S")
    temp_path = os.path.join(
        TEMP_UPLOAD_DIR, f"{prediction_id}_{file.filename}")

    try:
        with open(temp_path, "wb") as f:
            f.write(file.file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    # Process and Predict
    audio_chunks = preprocess_audio(temp_path)
    genre, confidence, chunk_prediction = predict_genres(audio_chunks)

    # Create response
    response = PredictResponse(
        final_prediction=genre,
        confidence=confidence,
        chunk_predictions=chunk_prediction,
        prediction_id=prediction_id,
        timestamp=datetime.now().isoformat()
    )

    save_to_history(response, file.filename)

    # clean up
    os.remove(temp_path)

    return response


@app.get("/history/", response_model=List[HistoryItem])
async def get_prediction_history():
    try:
        if not os.path.exists(HISTORY_FILE):
            return []
        with open(HISTORY_FILE, 'r') as f:
            history = json.load(f)
        return history
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/genres/")
async def get_supported_genres():
    return {"genres": GENRES}


@app.get("/health/")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "supported_formats": [".mp3", ".wav"]
    }


def save_to_history(prediction: PredictResponse, filename: str):
    history_item = HistoryItem(
        prediction_id=prediction.prediction_id,
        filename=filename,
        final_prediction=prediction.final_prediction,
        confidence=prediction.confidence,
        timestamp=prediction.timestamp
    )
    
    history = []
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, 'r') as f:
            history = json.load(f)
    
    history.append(history_item.model_dump())
    
    # Keep only last 100 predictions
    history = history[-100:]
    
    with open(HISTORY_FILE, 'w') as f:
        json.dump(history, f)


# Run project CLI uvicorn main:app --reload
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    

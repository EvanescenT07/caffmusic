from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
import os
import json
from typing import List

from app.config import Settings
from app.models import PredictResponse, HistoryItem
from app.utils.preprocessing import preprocess_audio
from app.utils.model import model

router = APIRouter()


@router.post("/predict", response_model=PredictResponse)
async def predict_audio(file: UploadFile = File(...)):
    if not file.filename.lower().endswith(('wav', 'mp3')):
        raise HTTPException(
            status_code=400,
            detail="Invalid file format. Only WAV and MP3 files are supported"
        )

    # Generate Prediction Id and save file temporarily
    prediction_id = datetime.now().strftime("%d%m%Y_%H%M%S")
    temp_file_path = os.path.join(
        Settings.TEMP_UPLOAD_DIR, f"{prediction_id}_{file.filename}"
    )

    try:
        # Save file temporarily
        with open(temp_file_path, "wb") as f:
            f.write(await file.read())

        # Preprocess and predict audio
        audio_chunks = preprocess_audio(temp_file_path)
        genre, confidence, chunk_prediction = model.predict(audio_chunks)

        # Response
        response = PredictResponse(
            final_prediction=genre,
            confidence=confidence,
            chunk_predictions=chunk_prediction,
            prediction_id=prediction_id,
            timestamp=datetime.now().isoformat()
        )

        # Save to history
        history_item = HistoryItem(
            prediction_id=prediction_id,
            filename=file.filename,
            final_prediction=genre,
            confidence=confidence,
            timestamp=datetime.now().isoformat()
        )

        #  Update history file
        try:
            with open(Settings.HISTORY_FILE, 'r') as f:
                history = json.load(f)

        except json.JSONEncoderError:
            history = []

        history.append(history_item.dict())
        history = history[-100:]

        with open(Settings.HISTORY_FILE, 'w') as f:
            json.dump(history, f)

        return response

    finally:
        # Clean up
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)


@router.get("/history", response_model=List[HistoryItem])
async def get_history():
    try:
        with open(Settings.HISTORY_FILE, 'r') as f:
            history = json.load(f)
        return history

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/genres")
async def get_genres():
    return {"genres": Settings.GENRES}


@router.get("/health")
async def health_check():
    return {
        "status": "UP",
        "message": "Service is up and running",
        "model_loaded": model.model is not None,
        "supported_formats": ["wav", "mp3"]
    }

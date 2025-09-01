import tensorflow as tf
import numpy as np
from fastapi import HTTPException
from app.config import Settings


class CaffMusicModel:
    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        try:
            self.model = tf.keras.models.load_model(Settings.MODEL_PATH)
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def predict(self, audio_chunks):
        if self.model is None:
            raise HTTPException(status_code=400, detail="Model not loaded")

        chunk_prediction = self.model.predict(audio_chunks)
        pred_categories = np.argmax(chunk_prediction, axis=1)

        # Percentage for each genre
        genre_percentage = {
            genre: 0 for genre in Settings.GENRES
        }
        unique_preds, counts = np.unique(pred_categories, return_counts=True)
        for genre_idx, count in zip(unique_preds, counts):
            genre_percentage[Settings.GENRES[genre_idx]] = (
                count / len(pred_categories)) * 100

        # Get Majority Prediction
        majority_genre_idx = unique_preds[counts == np.max(counts)][0]
        confidence = np.max(counts) / len(pred_categories)

        return Settings.GENRES[majority_genre_idx], confidence, genre_percentage


# Init model
model = CaffMusicModel()

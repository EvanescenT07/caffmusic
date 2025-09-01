from pydantic import BaseModel
from typing import Dict

class PredictResponse(BaseModel):
    final_prediction: str
    confidence: float
    chunk_predictions: Dict[str, float]
    prediction_id: str
    timestamp: str

class HistoryItem(BaseModel):
    prediction_id: str
    filename: str
    final_prediction: str
    confidence: float
    timestamp: str
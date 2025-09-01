import os

# Class for configuration the apps
class Settings:
    APP_TITTLE = "CaffMusic"
    APP_DESCRIPTION = "API for machine learning Music Genre Recognition"
    APP_VERSION = "1.0.0"
    MODEL_PATH = "model/Music_Genre_Classification.h5"
    TEMP_UPLOAD_DIR = "temp_uploads"
    HISTORY_FILE = "prediction_history.json"
    GENRES = [
        "blues", "classical", "country", "disco",
        "hiphop", "jazz", "metal", "pop", "reggae", "rock"
    ]

# Create necessary directories and files
os.makedirs(Settings.TEMP_UPLOAD_DIR, exist_ok=True)
if not os.path.exists(Settings.HISTORY_FILE):
    with open(Settings.HISTORY_FILE, "w") as f:
        f.write("[]")

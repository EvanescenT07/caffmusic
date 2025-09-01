import librosa
import numpy as np
from tensorflow.image import resize # type: ignore
from fastapi import HTTPException


def preprocess_audio(file_path: str, target_shape=(150, 150)):
    try:
        audio_data, sample_rate = librosa.load(file_path, sr=None)

        # Chunk Tuning
        chunk_duration = 4
        overlap_duration = 2
        chunk_sample = chunk_duration * sample_rate
        overlap_sample = overlap_duration * sample_rate

        tot_chunks = int(
            np.ceil((len(audio_data) - chunk_sample) / (chunk_sample - overlap_sample))) + 1

        chunks = []

        for i in range(tot_chunks):
            start = i * (chunk_sample - overlap_sample)
            end = start + chunk_sample
            chunk = audio_data[start:end]

            if len(chunk) < chunk_sample:
                chunk = np.pad(
                    chunk, (0, chunk_sample - len(chunk)), 'constant')

            mel_spectrogram = librosa.feature.melspectrogram(
                y=chunk, sr=sample_rate, n_mels=128
            )

            mel_spectrogram = resize(
                np.expand_dims(mel_spectrogram, axis=-1), target_shape
            )

            chunks.append(mel_spectrogram)

            return np.array(chunks)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

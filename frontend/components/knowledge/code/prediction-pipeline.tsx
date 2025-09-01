import CodeSnippet from "../code-snippet";

export default function PredictionPipelineSnippet() {
  return (
    <CodeSnippet
      language="Python"
      code={`
def preprocess_audio_for_prediction(file_path, target_shape=(150, 150)):
    y, sr = librosa.load(file_path, sr=None)
    chunk_duration = 4
    overlap_duration = 2
    chunk_sample = chunk_duration * sr
    overlap_sample = overlap_duration * sr
    tot_chunk = int(np.ceil((len(y) - chunk_sample) / (chunk_sample - overlap_sample))) + 1
    chunks_processed = []
    for i in range(tot_chunk):
        start = i * (chunk_sample - overlap_sample)
        end = start + chunk_sample
        chunk = y[start:end]
        if len(chunk) < chunk_sample:
            chunk = np.pad(chunk, (0, chunk_sample - len(chunk)))
        mel_spectrogram = librosa.feature.melspectrogram(y=chunk, sr=sr, n_mels=128)
        mel_spectrogram = resize(np.expand_dims(mel_spectrogram, axis=-1), target_shape)
        chunks_processed.append(mel_spectrogram)
    return np.array(chunks_processed)

def predict_genre(X_test, model, genre_labels):
    chunk_predictions = model.predict(X_test)
    pred_categories = np.argmax(chunk_predictions, axis=1)
    unique_preds, counts = np.unique(pred_categories, return_counts=True)
    max_count = np.max(counts)
    majority_pred = unique_preds[counts == max_count][0]
    confidence = max_count / len(pred_categories)
    return genre_labels[majority_pred], confidence
    `}
    />
  );
}

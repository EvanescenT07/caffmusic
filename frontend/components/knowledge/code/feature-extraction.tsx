import CodeSnippet from "@/components/knowledge/code-snippet";

export default function FeatExtactionCode() {
  return (
    <CodeSnippet
      language="Python"
      code={`
import librosa
import numpy as np

def extract_melspectrogram_chunks(audio_path, chunk_duration=4, overlap_duration=2, n_mels=128):
    y, sr = librosa.load(audio_path, sr=None)
    chunk_sample = chunk_duration * sr
    overlap_sample = overlap_duration * sr
    tot_chunk = int(np.ceil((len(y) - chunk_sample) / (chunk_sample - overlap_sample))) + 1
    melspec_chunks = []
    for i in range(tot_chunk):
        start = i * (chunk_sample - overlap_sample)
        end = start + chunk_sample
        chunk = y[start:end]
        if len(chunk) < chunk_sample:
            chunk = np.pad(chunk, (0, chunk_sample - len(chunk)))
        melspec = librosa.feature.melspectrogram(y=chunk, sr=sr, n_mels=n_mels)
        melspec_db = librosa.power_to_db(melspec, ref=np.max)
        melspec_chunks.append(melspec_db)
            
    return melspec_chunks
`}
    />
  );
}

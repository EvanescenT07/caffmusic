"use client";

import type React from "react";
import { useState, useEffect } from "react";
import type { PredictionResultProps } from "@/types/type";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Loader2, Music, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const DetectionComponents = ({ id }: { id: string }) => {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResultProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PredictionResultProps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    try {
      const response = await axios.get("/api/history");
      setHistory(response.data);
    } catch {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (
      selectedFile &&
      (selectedFile.type === "audio/mpeg" ||
        selectedFile.type === "audio/wav" ||
        selectedFile.type === "audio/mp3")
    ) {
      setFile(selectedFile);
      setError(null);
      toast.success("Audio file uploaded successfully");
    } else {
      setFile(null);
      setError("Please select a valid audio file (mp3, wav, mpeg)");
      toast.error("Invalid file type");
    }
  };

  const handlePredict = async () => {
    if (!file) return;
    setIsLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000,
      });
      if (response.data && response.data.final_prediction) {
        setResult(response.data);
        toast.success("Prediction successful");

        try {
          await axios.post(`/api/history/${response.data.prediction_id}`, {
            fileName: file.name,
            genre: response.data.final_prediction,
            predictionId: response.data.prediction_id,
            confidence: response.data.confidence,
            chunkPredictions: response.data.chunk_predictions,
            finalPrediction: response.data.final_prediction,
            timestamp: new Date().toISOString(),
          });
          fetchHistory();
        } catch {
          toast.error("Failed to save prediction history");
        }
      } else {
        toast.error(response.data?.error || "Prediction failed");
      }
    } catch {
      setError("Prediction failed");
      toast.error("Prediction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/history/${id}`);
      toast.success("History deleted successfully");
      fetchHistory();
    } catch {
      toast.error("Failed to delete history");
    }
  };

  return (
    <div id={id} className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-3">
        <h3 className="text-center font-semibold text-4xl text-[#383838] dark:text-[#f1ecec]">
          Predict Your Music Now
        </h3>
        <span className="text-center font-normal text-muted-foreground text-base">
          Upload your music file and see the AI in action
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8">
        {/* Audio Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#383838] dark:text-[#ccc]">
              Upload Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer flex flex-col items-center justify-center p-8 hover:bg-muted/50 transition-colors">
              <Input
                type="file"
                accept=".mp3, .wav, .mpeg"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center gap-3 text-center">
                <Music className="w-10 h-10 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {file ? file.name : "Upload your audio file (mp3, wav, mpeg)"}
                </span>
              </div>
            </label>

            {error && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <Button
              onClick={handlePredict}
              disabled={!file || isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Predict"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#383838] dark:text-[#ccc]">
              Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-8">
                <Loader2 className="animate-spin w-5 h-5" />
                <p className="text-[#383838] dark:text-[#ccc]">
                  Processing audio...
                </p>
              </div>
            )}

            {!isLoading && !result && !error && (
              <div className="text-center text-muted-foreground py-8">
                Upload an audio file and click Predict to see results
              </div>
            )}

            {result && (
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2 text-[#383838] dark:text-[#ccc]">
                  Latest Prediction
                </h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">
                      Final Prediction:
                    </span>
                    <span className="font-medium">
                      {result.finalPrediction}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="font-medium text-[#383838] dark:text-[#ccc]">
                      {(result.confidence * 100).toFixed(2)}%
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-muted-foreground">Timestamp:</span>
                    <span className="text-sm text-[#383838] dark:text-[#ccc]">
                      {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            )}

            <Separator className="my-4" />

            <div>
              <h3 className="font-medium mb-3 text-[#383838] dark:text-[#ccc]">
                Your Prediction History
              </h3>
              {history.length === 0 ? (
                <div className="text-muted-foreground text-sm text-center py-4">
                  No prediction history yet.
                </div>
              ) : (
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    {history.map((item) => (
                      <li
                        key={item.id}
                        className="bg-muted/50 rounded-md p-3 flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.fileName}
                          </span>
                          <span className="font-bold dark:text-[#ccc] text-[#383838]">
                            {item.finalPrediction}
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetectionComponents;

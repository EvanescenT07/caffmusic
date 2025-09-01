"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import KnowledgePipeline from "@/components/knowledge/pipeline";
import FeatExtactionCode from "./code/feature-extraction";
import ModelArchitectureLog from "./code/model-archi-log";
import ModelImplementation from "./code/model-impementation";
import ModelEvaluation from "./code/model-evaluation";
import { Separator } from "../ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import PredictionPipelineSnippet from "./code/prediction-pipeline";

export default function KnowledgeContent() {
  return (
    <>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold mb-2 text-[#383838] dark:text-[#ccc]">
          Machine Learning for Music Genre Detection
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Explore the technology and algorithms behind music genre
          classification system
        </p>
      </div>

      <Tabs defaultValue="overview" className="mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 justify-center mx-auto max-w-4xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Audio Features</TabsTrigger>
          <TabsTrigger value="model">Model Architecture</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent
          value="overview"
          className="space-y-6 max-w-4xl mx-auto px-4"
        >
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                What is Music Genre Detection?
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                An introduction to automated music classification
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                Music genre detection is a machine learning task that involves
                automatically classifying music tracks into predefined genres
                such as Rock, Pop, Classical, Jazz, Hip Hop, and more. This
                technology analyzes audio signals to identify patterns and
                characteristics unique to each genre.
              </p>
              <p className="text-[#383838] dark:text-[#ccc]">
                This system uses deep learning techniques to process audio files
                and predict their genre with high accuracy. The model has been
                trained on thousands of labeled music samples across multiple
                genres.
              </p>
              <div className="my-6">
                <KnowledgePipeline />
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Key Component
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Audio preprocessing, including chunking and augmentation for
                  robust training
                </li>
                <li>
                  Feature extraction using Mel spectrograms to capture essential
                  audio characteristics
                </li>
                <li>
                  Deep convolutional neural network for accurate genre
                  classification
                </li>
                <li>
                  Post-processing by aggregating predictions from audio chunks
                  to improve reliability
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="features"
          className="space-y-6 max-w-4xl mx-auto px-4"
        >
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                Audio Features Extraction
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Transform raw audio into meaningful features
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                Raw audio files cannot be directly fed into machine learning
                models. Instead, we extract meaningful features that capture the
                essence of the music. The most important features we use
                include:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Mel Spectrogram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      Mel spectrogram is a time-frequency representation of the
                      audio signal, mapping frequencies to the Mel scale. It
                      captures both spectral and temporal characteristics of
                      music, making it highly effective for genre classification
                      using deep learning.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Audio Chunking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      Each audio file is split into overlapping chunks. This
                      allows the model to analyze different segments of a song,
                      improving its ability to recognize multiple genres or
                      transitions within a track.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Data Augmentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      To enhance model robustness, audio data is augmented using
                      techniques such as pitch shifting and time stretching.
                      This increases the diversity of the training set and helps
                      prevent overfitting.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-[#383838] dark:text-[#ccc]">
                      Normalization & Resizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      The Mel spectrograms are normalized and resized to a fixed
                      shape before being fed into the neural network. This
                      ensures consistent input dimensions for efficient model
                      training and inference.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Feature Extraction Code
              </h3>
              <FeatExtactionCode />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="model" className="space-y-6 max-w-4xl mx-auto px-4">
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                Model Architecture
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                The neural network behind genre classification
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                This genre detection system uses a Convolutional Neural Network
                (CNN) combined with recurrent layers to capture both time and
                frequency domain patterns in the audio. This architecture has
                proven effective for audio classification tasks.
              </p>
              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Model Architecture
              </h3>
              <div className="bg-muted/50 p-4 rounded-md my-4">
                <ModelArchitectureLog />
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Model Implementation
              </h3>
              <ModelImplementation />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="evaluation"
          className="space-y-6 max-w-4xl mx-auto px-4"
        >
          <Card className="w-full shadow-md hover:shadow-xl transition-shadow duration-500 ease-in-out">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#383838] dark:text-[#ccc]">
                Model Evaluation
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                How we measure performance and ensure accuracy
              </CardDescription>
            </CardHeader>

            <CardContent className="w-full space-y-4">
              <p className="text-[#383838] dark:text-[#ccc]">
                Evaluating a music genre classification system requires careful
                consideration of multiple metrics. In this case a combination of
                quantitative metrics and qualitative testing to ensure our model
                performs well across different genres and audio qualities.
              </p>
              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Accuracy
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Overall correctness of the model&apos;s predictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      The ratio of correctly predicted genres to the total
                      number of predictions. It provides a general sense of the
                      model&apos;s performance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Precision
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Measure of exactness in predictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      The ratio of true positive predictions to the total number
                      of positive predictions. It indicates how many of the
                      predicted genres were correct.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      Recall
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Measure of sensitivity in predictions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      The ratio of true positive predictions to the total number
                      of actual positive instances. It indicates how many of the
                      actual genres were correctly predicted.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#383838] dark:text-[#ccc]">
                      F1 Score
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Balance between precision and recall
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-justify text-[#383838] dark:text-[#ccc]">
                      The harmonic mean of precision and recall. It provides a
                      single score that balances both metrics, especially useful
                      when dealing with imbalanced datasets.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Evaluation Code
              </h3>
              <ModelEvaluation />

              <h3 className="text-lg font-semibold mt-6 text-[#383838] dark:text-[#ccc]">
                Challenge
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <h4 className="text-semibold text-[#383838] dark:text-[#ccc]">
                    Genre Similarity
                  </h4>
                  <p className="text-sm text-justify text-muted-foreground">
                    The model may struggle with genres that have similar
                    characteristics or when the audio quality is poor.
                  </p>
                </li>
                <li>
                  <h4 className="text-semibold text-[#383838] dark:text-[#ccc]">
                    Mixed Genres
                  </h4>
                  <p className="text-sm text-justify text-muted-foreground">
                    Real-world music often contains mixed genres, making it
                    challenging to classify accurately.
                  </p>
                </li>
                <li>
                  <h4 className="text-semibold text-[#383838] dark:text-[#ccc]">
                    Dataset Bias
                  </h4>
                  <p className="text-sm text-justify text-muted-foreground">
                    The model&apos;s performance may vary based on the dataset
                    used for training and evaluation.
                  </p>
                </li>
                <li>
                  <h4 className="text-semibold text-[#383838] dark:text-[#ccc]">
                    Real-time Processing
                  </h4>
                  <p className="text-sm text-justify text-muted-foreground">
                    Implementing real-time genre detection can be
                    computationally intensive and requires optimization.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      <div className="max-w-4xl mx-auto px-4 my-8">
        <Accordion type="single" collapsible>
          <AccordionItem value="Implementation Details">
            <AccordionTrigger className="text-2xl font-bold text-[#383838] dark:text-[#ccc] px-2">
              Implementation Details
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 space-y-4 px-2">
                <p className="text-base text-[#383838] dark:text-[#ccc]">
                  This system implementation uses a combination of Python
                  libraries for audio processing and machine learning:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#383838] dark:text-[#ccc]">
                  <li>
                    <strong>Librosa:</strong> For audio feature extraction and
                    processing
                  </li>
                  <li>
                    <strong>TensorFlow/Keras:</strong> For building and training
                    the neural network
                  </li>
                  <li>
                    <strong>NumPy:</strong> For numerical operations on audio
                    data
                  </li>
                  <li>
                    <strong>Scikit-learn:</strong> For evaluation metrics and
                    preprocessing
                  </li>
                </ul>
                <h3 className="font-bold text-xl text-[#383838] dark:text-[#ccc]">
                  Prediction Pipeline
                </h3>
                <PredictionPipelineSnippet />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="Future Improvements">
            <AccordionTrigger className="text-2xl font-bold text-[#383838] dark:text-[#ccc] px-2">
              Future Improvements
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 space-y-4 px-2">
                <p className="text-base text-[#383838] dark:text-[#ccc]">
                  To improve this music genre detection system. Some planned
                  enhancements include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#383838] dark:text-[#ccc]">
                  <li>
                    <strong>More Genres:</strong> Expanding this model to
                    recognize additional genres and subgenres
                  </li>
                  <li>
                    <strong>Retraining Model:</strong> Regularly updating the
                    model with new data to improve accuracy and adapt to
                    changing music
                  </li>
                  <li>
                    <strong>Retuning Hyperparameter:</strong> Updating the model
                    with new value of hyperparameters to improve accuracy
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="Resources & References">
            <AccordionTrigger className="text-2xl font-bold text-[#383838] dark:text-[#ccc] px-2">
              Resources & References
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-4 space-y-4 px-2">
                <p className="text-base text-[#383838] dark:text-[#ccc]">
                  If you&apos;re interested in learning more about music genre
                  detection and audio processing, check out these resources:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-[#383838] dark:text-[#ccc]">
                  <li>
                    <a
                      href="https://librosa.org/doc/latest/index.html"
                      className="text-primary hover:underline"
                    >
                      <strong>Librosa Documentation</strong>
                    </a>{" "}
                    - Python library for audio analysis
                  </li>
                  <li>
                    <a
                      href="https://www.tensorflow.org/tutorials/audio/simple_audio"
                      className="text-primary hover:underline"
                    >
                      <strong>TensorFlow Audio Tutorials</strong>
                    </a>{" "}
                    - Guides for audio processing with TensorFlow
                  </li>
                  <li>
                    <a
                      href="https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification"
                      className="text-primary hover:underline"
                    >
                      <strong>GTZAN Dataset</strong>
                    </a>{" "}
                    - Popular dataset for music genre classification
                  </li>
                  <li>
                    <a
                      href="https://github.com/markovka17/dla"
                      className="text-primary hover:underline"
                    >
                      <strong>Deep Learning for Audio Processing</strong>
                    </a>{" "}
                    - Comprehensive guide
                  </li>
                  <li>
                    <a
                      href="https://musicinformationretrieval.com/"
                      className="text-primary hover:underline"
                    >
                      <strong>Music Information Retrieval</strong>
                    </a>{" "}
                    - Academic resources on MIR
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

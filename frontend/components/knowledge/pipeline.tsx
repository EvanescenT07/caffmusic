import { PipelineList } from "@/types/type";

const data: PipelineList = [
  {
    step: 1,
    title: "Audio Input",
    description: "Upload your audio file in MP3 or WAV format.",
  },
  {
    step: 2,
    title: "Feature Extraction",
    description:
      "Audio is split into overlapping chunks and converted to Mel spectrograms.",
  },
  {
    step: 3,
    title: "Model Processing",
    description:
      "A deep convolutional neural network analyzes the spectrograms.",
  },
  {
    step: 4,
    title: "Genre Prediction",
    description:
      "The model predicts the genre for each chunk and aggregates results with a confidence score.",
  },
];

export default function KnowledgePipeline() {
  return (
    <div className="w-full py-4 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {data.map((item, index) => (
          <div className="flex flex-col items-center w-full" key={index}>
            <div className="w-16 h-16 rounded-full bg-muted/30 border flex items-center justify-center mb-2">
              <span className="text-lg font-bold">{item.step}</span>
            </div>
            <h3 className="text-base font-medium text-[#383838] dark:text-[#ccc]">
              {item.title}
            </h3>
            <p className="text-xs text-muted-foreground text-center">
              {item.description}
            </p>

            {index < data.length && (
              <div className="hidden md:block h-0.5 w-full md:w-8 bg-muted-foreground/30 my-4 md:my-0 md:rotate-0 md:mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

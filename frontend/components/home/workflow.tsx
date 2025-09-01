import { WorkflowComponentList } from "@/types/type";
import { BarChart, Cpu, Upload } from "lucide-react";

const WorkflowCardComponent: WorkflowComponentList = [
  {
    step: 1,
    icon: <Upload className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />,
    title: "Upload Your Music",
    description:
      "Select and upload any MP3, WAV, or MPEG audio file to CaffMusic",
  },
  {
    step: 2,
    icon: <Cpu className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />,
    title: "AI Analysis",
    description:
      "CaffMusic ML model processes the audio, analyzing patterns, rhythm, and frequencies.",
  },
  {
    step: 3,
    icon: <BarChart className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />,
    title: "Get Results",
    description:
      "Receive genre classification with confidence scores in seconds.",
  },
];

const WorkflowComponent = ({ id }: { id: string }) => {
  return (
    <div id={id} className="container mx-auto px-4 py-8">
      <div className="flex flex-col justify-center items-center space-y-3">
        <h3 className="text-4xl font-extrabold text-[#383838] dark:text-[#f1ecec]">
          How It Works
        </h3>
        <span className="max-w-3xl text-center font-normal text-base text-muted-foreground">
          Our machine learning model analyzes audio patterns to identify music
          genres
        </span>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {WorkflowCardComponent.map((workflow, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-xl space-y-3"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow">
                Step {workflow.step}
              </div>
              <div className="font-bold p-4 rounded-full">{workflow.icon}</div>
              <h3 className="font-bold text-lg text-[#383838] dark:text-[#f1ecec]">
                {workflow.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {workflow.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowComponent;

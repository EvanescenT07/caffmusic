"use client";

import { ArrowRight, AudioWaveform, Headphones, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardComponentList } from "@/types/type";
import SoundWaveAnimationComponent from "@/components/animation/soundwave";
import WorkflowComponent from "./workflow";

const CardComponent: CardComponentList = [
  {
    icon: <Music className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />,
    title: "Multiple Genres",
    description:
      "CaffMusic can identify multiple genres in a single track, providing a comprehensive analysis of your music.",
  },
  {
    icon: <Headphones className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />,
    title: "Audio Insights",
    description:
      "Discover interesting details about your music's characteristics and patterns.",
  },
  {
    icon: (
      <AudioWaveform className="h-8 w-8 text-[#383838] dark:text-[#f1ecec]" />
    ),
    title: "INstant Results",
    description:
      "Get genre predictions in seconds with detailed confidence scores.",
  },
];

const handleTryMe = () => {
  const detectionSection = document.getElementById("detect");
  if (detectionSection) {
    detectionSection.scrollIntoView({ behavior: "smooth" });
  }
};

const HeroComponent = ({ id }: { id: string }) => {
  return (
    <div id={id} className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center space-y-3">
        <h3 className="text-center font-black text-4xl text-[#383838] dark:text-[#f1ecec]">
          Discover the Genre of Your Music
        </h3>
        <span className="max-w-3xl text-center font-normal text-base text-muted-foreground">
          CaffMusic uses machine learning to analyze and identify music genres.
          Upload your Music and get instant genre classification
        </span>
        <div className="flex max-w-3xl pt-4">
          <Button
            onClick={handleTryMe}
            className="bg-[#ccc] dark:bg-[#383838] rounded-lg px-7"
          >
            Try it Now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => {}}
            className="ml-4 bg-transparent rounded-lg px-5"
          >
            Learn More
          </Button>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {CardComponent.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-all hover:shadow-xl space-y-3"
            >
              <div className="bg-accent p-4 rounded-full">{card.icon}</div>
              <h3 className="font-bold text-lg text-[#383838] dark:text-[#f1ecec]">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-8 w-full h-16">
          <SoundWaveAnimationComponent />
        </div>
        <div className="pt-8 w-full">
          <WorkflowComponent id="workflow" />
        </div>
      </div>
    </div>
  );
};

export default HeroComponent;

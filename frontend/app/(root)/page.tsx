import DetectionComponents from "@/components/detection/detect";
import HeroComponent from "@/components/home/hero";

export default function Home() {
  return (
    <section className="container mx-auto min-h-screen xl:pt-2">
      <HeroComponent id="home" />
      <DetectionComponents id="detect" />
    </section>
  );
}

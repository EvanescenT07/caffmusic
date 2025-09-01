const SoundWaveAnimationComponent = () => {
  return (
    <div className="flex h-full items-end justify-center space-x-1">
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="h-2 w-1 bg-primary rounded-full"
          style={{
            animationName: "soundwave",
            animationDelay: `${i * 0.05}s`,
            animationDuration: "1s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

export default SoundWaveAnimationComponent;

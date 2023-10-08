import React, { useRef, useEffect, ChangeEvent } from "react";

type ProgressBarProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  progress: number;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  totalDuration: number;
  setTotalDuration: React.Dispatch<React.SetStateAction<number>>;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  index: string; // Add index as a prop
};

function ProgressBar({ videoRef, progress, setProgress, index, currentTime, setCurrentTime, totalDuration, setTotalDuration }: ProgressBarProps) {
  const startX = useRef<number>(0)
  

    const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
  
useEffect(() => {
  const video = videoRef.current;
  const rangeInput = document.querySelector(`#range-${index}`) as HTMLInputElement;
  const beforeElemen = document.querySelector(`#before-${index}`) as HTMLElement;

  if (video && rangeInput && beforeElemen) {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      video?.pause();
      startX.current = e.clientX - (beforeElemen.offsetLeft || 0);

      const handleMouseMove = (e: MouseEvent) => {
        const newPosition = e.clientX - startX.current;
        const maxPosition = rangeInput.offsetWidth - beforeElemen.offsetWidth;
        const boundedPosition = Math.max(0, Math.min(maxPosition, newPosition));
        const progressValue = boundedPosition / maxPosition;

        beforeElemen.style.left = `${boundedPosition}px`;
        
        setProgress(progressValue);

        video.currentTime = progressValue * video.duration;
      };

      const handleMouseUp = () => {
        video?.play();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTimeUpdate = () => {
      if(video.currentTime === 0){
        beforeElemen.style.opacity = "0";
      }
      setCurrentTime(video.currentTime);
      setTotalDuration(video.duration);
      const thumbRect = rangeInput.getBoundingClientRect();
      const thumbPosition = Math.max(10, (thumbRect.width * progress) / parseFloat(rangeInput.max || "1"));
      beforeElemen.style.left = `${thumbPosition + 3}px`;
      
      
    };

    const handleVideoEnded = () => {
     beforeElemen.style.opacity = "1";
    };

    // Attach event listeners
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnded);
    beforeElemen.addEventListener('mousedown', handleMouseDown);

    // Cleanup: remove the event listeners when the component unmounts
    // return () => {
    //   video.removeEventListener('timeupdate', handleTimeUpdate);
    //   beforeElemen.removeEventListener('mousedown', handleMouseDown);
    // };
  }
}, [progress, videoRef, setProgress, index]);

  return (
    <div className="content-progress" key={index}>
        <input
            type="range"
            min="0"
            max="1"
            step="0.01" // You can use smaller steps for smoother progress
            className="range-progress"
            id={`range-${index}`}
            value={progress}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const video = videoRef.current;
            if (video) {
                // Update video's current time when user interacts with the progress bar
                video.currentTime = Number(e.target.value) * video.duration;
                setProgress(video.currentTime / video.duration);
            }
            }}
            />
        <div id={`before-${index}`} className="before-element"></div>
        <span>{formatTime(currentTime)}/{formatTime(totalDuration)}</span>
    </div>
  );
}

export default ProgressBar;
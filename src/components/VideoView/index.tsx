/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect, MouseEventHandler } from "react"
import { VideoViewProps } from "../../modules/videoList"
import { BsPlayFill, BsFillChatDotsFill, BsFillBookmarkFill, BsFillPauseFill, BsFillVolumeMuteFill } from "react-icons/bs"
import { PiSpeakerHighThin } from "react-icons/pi"
import { AiFillHeart } from "react-icons/ai"
import { IoIosShareAlt } from "react-icons/io"
import "./video.styles.scss";

function VideoView({ avatar, name, subname, isTicked, description, music, videoUrl, like, comment, share, save, isFollow, _id}: VideoViewProps) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [videoData, setVideoData] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startX = useRef<number>(0)
  const rangeId = `range-progress-${_id}`;
  const beforeId = `before-element-${_id}`;



  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
 

const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsPaused(false);
  };

const handleMouseMove = (e: MouseEvent) => {
  const rangeInput = document.querySelector(`#${rangeId}`) as HTMLInputElement;
  const beforeElemen = document.querySelector(`#${beforeId}`) as HTMLElement;
  const video = videoRef.current;
  if(video){
    const newPosition = e.clientX - startX.current;
    const maxPosition = rangeInput.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxPosition, newPosition));
    const progressValue = boundedPosition / maxPosition;
  
    beforeElemen.style.width = `${(boundedPosition / maxPosition) * 100}%`;
    
    setProgress(progressValue);
  
    video.currentTime = progressValue * video.duration;
    video.pause()
    setIsPaused(true);
  }
};

   const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      const beforeElemen = document.querySelector(`#${beforeId}`) as HTMLElement;
      startX.current = e.clientX - (beforeElemen.offsetWidth || 0);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };


    const handleTimeUpdate = () => {
      const video = videoRef.current;
      const rangeInput = document.querySelector(`#${rangeId}`) as HTMLInputElement;
      const beforeElemen = document.querySelector(`#${beforeId}`) as HTMLElement;
       if (video && rangeInput && beforeElemen) {
        setCurrentTime(video.currentTime);
        setTotalDuration(video.duration);
        
        const maxPosition = rangeInput.offsetWidth;
        const thumbPosition = (maxPosition * progress) / parseFloat(rangeInput.max || "1") + (0.04 * maxPosition);

        beforeElemen.style.width = `${(thumbPosition / maxPosition) * 100}%`; // Set width dynamically in percentage
      }
      
      
    };

   useEffect(() => {
    const video = videoRef.current;
    const handleLoadedData = () => {
  
      if (video) {
        video.volume = 0
        setVolume(0);
        setIsMuted(true);
      }
    };

    if (video) {
      video.addEventListener('loadeddata', handleLoadedData);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }

   
  }, []);

   const handlePlayPause = (e: any) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video && video.paused) {
      video.play();
      setIsPaused(false);
    } else if(video) {
      video.pause();
      setIsPaused(true);
    }
  };

  const handleVolumeChange = (value: any, e: any) => {
    e.stopPropagation();
    const video = videoRef.current;
    if(video){
      video.volume = value / 100;
      setVolume(value);
      setIsMuted(video.volume === 0); 
    }
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if(video && !video.muted){
      video.muted = true;
      setIsMuted(video.muted);
      setVolume(0);
    }else if(video && video.muted){
      video.muted = false;
      video.volume = 0.2
      setVolume(20);
      setIsMuted(video.muted);
    }
  };

   const handlePlay = () => {
    // Update progress immediately when the video starts playing
    const video = videoRef.current;
    if(video){
      setProgress(video.currentTime / video.duration);
    }
  };

const handleThumbClick = (e: any) => {
  const rangeInput = document.querySelector(`#${rangeId}`) as HTMLInputElement;
  const beforeElemen = document.querySelector(`#${beforeId}`) as HTMLElement;
  const video = videoRef.current;

  if (video && rangeInput && beforeElemen) {
    const rect = rangeInput.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const maxPosition = rangeInput.offsetWidth;
    const boundedPosition = Math.max(0, Math.min(maxPosition, clickX));
    const progressValue = boundedPosition / maxPosition;
    video.pause()
    beforeElemen.style.width = `${(boundedPosition / maxPosition) * 100}%`;
    setProgress(progressValue);
   
    
    video.currentTime = progressValue * video.duration;
  }
};



const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const videos = document.querySelectorAll('video'); // Get all video elements
      videos.forEach((video) => {
        if (video !== videoRef.current) {
           setIsPaused(true)
           video.pause(); // Pause other videos
        }
      });

      if (videoRef.current) {
        videoRef.current.play();
        setIsPaused(false);
      }
      
    }
  });
};

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

const observer = new IntersectionObserver(handleIntersect, options);


useEffect(() => {
  const handleVisibilityChange = () => {
      // if (document.hidden) {
      //   // Page is not visible, pause the video
      //   if (videoRef.current) {
      //     videoRef.current.pause();
      //     setIsPaused(true);
      //   }
      // }
    };
  document.addEventListener('visibilitychange', handleVisibilityChange);
  createObserver();
  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []); 





function createObserver() {
  const boxElement = document.querySelector(`#video-list-${_id}`) as HTMLElement;
  observer.observe(boxElement);
}

  

  return (
    <div className="video-list" key={_id} id={`video-list-${_id}`} onClick={() => videoRef?.current?.play()}>
        <div className="video-list__header">
            <img src={avatar} alt={name} className="video-list__avatar" />
            <div className="video-list__info">
                <p className="video-list__name">
                  <span className="video-list__name--bold">{name}</span>
                  <span>{subname}</span>
                  <span>{isTicked ? 'Ticked' : ''}</span>
                </p>
                <p className="video-list__description">{description}</p>
                <p className="video-list__music">{music}</p>
            </div>
            {!isFollow ?  <button className="video-list__follow-btn">Follow</button> : null }
        </div>
        <div className="video-list__content">
          <span className="content-head">...</span>
          <video className="content-video" 
            src={videoUrl}
            controls 
            loop
            autoPlay
            muted
            onClick={handlePlayPause}
            onPlay={handlePlay}
            onTimeUpdate={(e: any) => {
              setProgress(e.target.currentTime / e.target.duration);
              handleTimeUpdate()
            }} 
            ref={videoRef}
        />
          <div className="content-container">
            <div className="content-progress">
              <div className="content-progress__thumb" 
               id={`range-progress-${_id}`} onClick={handleThumbClick}>
                <div id={`before-element-${_id}`}className="content-progress__bg" onMouseDown={handleMouseDown}></div>
                <div className="content-progress__line"></div>
              </div>
              <span className="content-progress__time">{formatTime(currentTime)}/{formatTime(totalDuration)}</span>
            </div>
          </div>
         
          <div className="content-tool">
            <button className="tool-btn__play" onClick={handlePlayPause}>
              <span>
                {isPaused ? <BsPlayFill /> : <BsFillPauseFill />}
              </span>
            </button>
            <div className="tool-btn__volume">
               <input
                type="range"
                onChange={(e) => handleVolumeChange(e.target.value, e)}
                min="0"
                max="100"
                step="1"
                value={volume}
              />
               <span onClick={handleMuteToggle}>
                {isMuted ?  <BsFillVolumeMuteFill /> : <PiSpeakerHighThin />}
                </span>
            </div>
          </div>
        </div>
        <div className="video-list__side">
          <div className="side__tool">
              <button className="side__tool-btn">
                <span><AiFillHeart /></span>
              </button>
              <span className="tool-text">{like}</span>
          </div>
           <div className="side__tool">
              <button className="side__tool-btn">
                <span><BsFillChatDotsFill/></span>
              </button>
              <span className="tool-text">{comment}</span>
          </div>
          <div className="side__tool">
              <button className="side__tool-btn">
                <span><BsFillBookmarkFill /></span>
              </button>
              <span className="tool-text">{save}</span>
          </div>
           <div className="side__tool">
              <button className="side__tool-btn">
                <span><IoIosShareAlt /></span>
              </button>
              <span className="tool-text">{share}</span>
          </div>
        </div>
      
    </div>
  )
}

export default VideoView

import React, { useState, useEffect, useRef } from "react";
import "./FlipClockApp.css";

const FlipClockApp = () => {
  const [timeFormat, setTimeFormat] = useState("24");
  const [digitColor, setDigitColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [font, setFont] = useState("Arial, sans-serif");
  const [time, setTime] = useState(getFormattedTime());
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const controlsRef = useRef(null); // To check clicks inside the controls panel

  function getFormattedTime() {
    const date = new Date();
    return timeFormat === "12" ? date.toLocaleTimeString() : date.toLocaleTimeString("en-GB");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [timeFormat]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
      setShowControls(true); // Restore controls when exiting fullscreen
    }
  };

  const handleFullscreenClick = (e) => {
    if (isFullscreen) {
      // If clicking inside the controls panel, don't hide
      if (controlsRef.current && controlsRef.current.contains(e.target)) {
        return;
      }
      setShowControls((prev) => !prev);
    }
  };

  return (
    <div
      className="clock-container"
      style={{ backgroundColor: bgColor }}
      onClick={handleFullscreenClick} // Click outside controls to hide/show in fullscreen
    >
      <div className="flip-clock" style={{ color: digitColor, fontFamily: font }}>
        {time}
      </div>

      {showControls && (
        <div className="customization-panel" ref={controlsRef}>
          <div className="custom-option">
            <label>Time Format:</label>
            <select onChange={(e) => setTimeFormat(e.target.value)} className="control">
              <option value="24">24-Hour</option>
              <option value="12">12-Hour</option>
            </select>
          </div>

          <div className="custom-option">
            <label>Digit Color:</label>
            <input type="color" value={digitColor} onChange={(e) => setDigitColor(e.target.value)} />
          </div>

          <div className="custom-option">
            <label>Background Color:</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          </div>

          <div className="custom-option">
            <label>Font Style:</label>
            <select onChange={(e) => setFont(e.target.value)} className="control">
              <option value="Arial, sans-serif">Arial</option>
              <option value="'Courier New', monospace">Courier New</option>
              <option value="'Times New Roman', serif">Times New Roman</option>
              <option value="'Georgia', serif">Georgia</option>
              <option value="'Comic Sans MS', cursive">Comic Sans</option>
            </select>
          </div>

          <button onClick={toggleFullscreen} className="control">Fullscreen</button>
        </div>
      )}
    </div>
  );
};

export default FlipClockApp;

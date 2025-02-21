import React, { useState, useEffect } from "react";
import FlipClock from "react-flip-clock";
import "react-flip-clock/dist/styles.css";

const FlipClockApp = () => {
  const [timeFormat, setTimeFormat] = useState("24");
  const [digitColor, setDigitColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getCurrentTime = () => {
    const date = new Date();
    return timeFormat === "12" ? date.toLocaleTimeString() : date.toLocaleTimeString("en-GB");
  };

  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [timeFormat]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center" style={{ backgroundColor: bgColor }}>
      <div className="mb-4 flex space-x-4">
        <select onChange={(e) => setTimeFormat(e.target.value)} className="p-2 bg-gray-800 text-white rounded">
          <option value="24">24-Hour</option>
          <option value="12">12-Hour</option>
        </select>
        <input type="color" value={digitColor} onChange={(e) => setDigitColor(e.target.value)} />
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        <button onClick={toggleFullscreen} className="p-2 bg-blue-500 text-white rounded">Fullscreen</button>
      </div>
      <FlipClock
        value={time}
        digitStyle={{ color: digitColor }}
        className="text-6xl"
      />
    </div>
  );
};

export default FlipClockApp;

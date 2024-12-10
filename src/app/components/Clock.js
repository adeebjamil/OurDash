// src/app/components/Clock.js
"use client";

import { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    // Only set initial time after component mounts
    setTime(new Date().toLocaleTimeString('en-US'));
    
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Return empty div until client-side time is set
  if (!time) return <div className="text-4xl font-bold">Loading...</div>;

  return (
    <div className="text-4xl font-bold">
      {time}
    </div>
  );
};

export default Clock;
import logo from './logo.svg';
import './App.css';
import { Button, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeInterval = useRef(null);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    timeInterval.current = setInterval(() => {
      setTimer((prev) => prev + 10);
    }, 10);
  };

  const handleStop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    clearInterval(timeInterval.current);
  }

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(timeInterval.current);
    setTimer(0);
  }

  const formatTime = (timer) => {
    let mins = Math.floor(timer / 60000).toString().padStart(1, '0');
    let secs = Math.floor((timer / 1000) % 60).toString().padStart(2, '0');
    return { mins, secs };
  }

  const { mins, secs } = formatTime(timer);

  useEffect(() => {
    return (() => clearInterval(timeInterval.current));
  }, []);

  return (
    <div className="App">
      <Typography fontWeight='bold' variant='h1'>Stopwatch</Typography>
      <Typography variant='h3' sx={{ mt: 5, mb: 5 }}>Time: {mins}:{secs}</Typography>
      {!isRunning ? <Button onClick={handleStart} variant='contained'>Start</Button> : <Button onClick={handleStop} variant='contained'>Stop</Button>}
      <Button onClick={handleReset} variant='contained' sx={{ ml: 5, }}>Reset</Button>
    </div>
  );
}

export default App;

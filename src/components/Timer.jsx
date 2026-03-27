import { useState, useEffect, useRef } from 'react';

const Timer = ({ duration, onComplete, type = 'rest' }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const progress = ((duration - timeLeft) / duration) * 100;
  const color = type === 'rest' ? '#00ff88' : '#4ecdc4';

  return (
    <div style={styles.container}>
      <div style={styles.timerDisplay}>
        <div style={{...styles.progressRing, borderColor: color}}>
          <svg style={styles.progressSvg} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#2a2a2a"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              transform="rotate(-90 50 50)"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div style={styles.timeText}>{formatTime(timeLeft)}</div>
        </div>
      </div>
      <div style={styles.controls}>
        <button onClick={handleStartPause} style={{...styles.button, backgroundColor: color}}>
          {isRunning ? '⏸ Pause' : '▶ Start'}
        </button>
        <button onClick={handleReset} style={styles.button}>
          ↻ Reset
        </button>
      </div>
      <div style={styles.label}>
        {type === 'rest' ? 'Rest Timer' : 'Exercise Timer'}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  },
  timerDisplay: {
    position: 'relative',
  },
  progressRing: {
    width: '200px',
    height: '200px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  timeText: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#ffffff',
    zIndex: 1,
  },
  controls: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#3a3a3a',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  label: {
    fontSize: '14px',
    color: '#b0b0b0',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
};

export default Timer;

// Made with Bob

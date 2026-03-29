import { useState, useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Timer from './Timer';

const WorkoutMode = ({ exercises, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restDuration] = useState(60); // 60 seconds rest between exercises

  const currentExercise = exercises[currentIndex];
  const progress = ((currentIndex + 1) / exercises.length) * 100;

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setIsResting(true);
    } else {
      // Workout complete
      onExit();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsResting(false);
    }
  };

  const handleRestComplete = () => {
    setIsResting(false);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setCurrentIndex(currentIndex + 1);
  };

  if (isResting) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.exitButton} onClick={onExit}>
            ✕ Exit Workout
          </button>
          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${progress}%`}} />
          </div>
        </div>

        <div style={styles.restScreen}>
          <h2 style={styles.restTitle}>Rest Time</h2>
          <p style={styles.restSubtitle}>Get ready for the next exercise</p>
          
          <Timer 
            duration={restDuration} 
            type="rest"
            onComplete={handleRestComplete}
          />

          <div style={styles.nextExercisePreview}>
            <p style={styles.previewLabel}>Up Next:</p>
            <h3 style={styles.previewName}>{exercises[currentIndex + 1]?.name}</h3>
          </div>

          <button style={styles.skipButton} onClick={handleSkipRest}>
            Skip Rest →
          </button>
        </div>
      </div>
    );
  }

  const displayInfo = currentExercise.time 
    ? currentExercise.time 
    : `${currentExercise.sets} × ${currentExercise.reps}`;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.exitButton} onClick={onExit}>
          ✕ Exit Workout
        </button>
        <div style={styles.progressInfo}>
          <span style={styles.progressText}>
            Exercise {currentIndex + 1} of {exercises.length}
          </span>
          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${progress}%`}} />
          </div>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.exerciseHeader}>
          <h1 style={styles.exerciseTitle}>{currentExercise.name}</h1>
          <div style={styles.exerciseBadge}>{displayInfo}</div>
        </div>

        <div style={styles.exerciseInfo}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>💪 Muscles:</span>
            <span style={styles.infoValue}>{currentExercise.muscles}</span>
          </div>
          {currentExercise.correctForm && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>✓ Correct Form:</span>
              <span style={styles.infoValue}>{currentExercise.correctForm}</span>
            </div>
          )}
          {currentExercise.makeEasier && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>💡 Make easier:</span>
              <span style={styles.infoValue}>{currentExercise.makeEasier}</span>
            </div>
          )}
          {currentExercise.makeHarder && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>🔥 Make harder:</span>
              <span style={styles.infoValue}>{currentExercise.makeHarder}</span>
            </div>
          )}
          {currentExercise.rest && (
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>⏱ Rest:</span>
              <span style={styles.infoValue}>{currentExercise.rest}</span>
            </div>
          )}
        </div>

        <div style={styles.videoSection}>
          <VideoPlayer videoFile={currentExercise.videoFile} />
        </div>

        <div style={styles.controls}>
          <button 
            style={{...styles.controlButton, ...styles.secondaryButton}} 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>
          
          <button 
            style={{...styles.controlButton, ...styles.primaryButton}} 
            onClick={handleNext}
          >
            {currentIndex === exercises.length - 1 ? 'Complete Workout' : 'Next Exercise →'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0a0a0a',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    borderBottom: '1px solid #2a2a2a',
    backgroundColor: '#1a1a1a',
  },
  exitButton: {
    padding: '8px 16px',
    backgroundColor: '#ff4444',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  progressInfo: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  progressText: {
    fontSize: '14px',
    color: '#b0b0b0',
    whiteSpace: 'nowrap',
  },
  progressBar: {
    flex: 1,
    height: '8px',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    transition: 'width 0.3s ease',
  },
  content: {
    flex: 1,
    padding: '40px',
    overflowY: 'auto',
    maxWidth: '1000px',
    margin: '0 auto',
    width: '100%',
  },
  exerciseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  exerciseTitle: {
    margin: 0,
    fontSize: '36px',
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  exerciseBadge: {
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '20px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  exerciseInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
  },
  infoLabel: {
    color: '#b0b0b0',
    fontWeight: '600',
    minWidth: '140px',
  },
  infoValue: {
    color: '#ffffff',
    flex: 1,
  },
  videoSection: {
    marginBottom: '40px',
  },
  controls: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
  },
  controlButton: {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '160px',
  },
  primaryButton: {
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
  },
  secondaryButton: {
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  restScreen: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    textAlign: 'center',
  },
  restTitle: {
    fontSize: '48px',
    fontWeight: '700',
    color: '#00ff88',
    margin: '0 0 8px 0',
  },
  restSubtitle: {
    fontSize: '18px',
    color: '#b0b0b0',
    margin: '0 0 40px 0',
  },
  nextExercisePreview: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    minWidth: '300px',
  },
  previewLabel: {
    fontSize: '14px',
    color: '#b0b0b0',
    margin: '0 0 8px 0',
  },
  previewName: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#ffffff',
    margin: 0,
  },
  skipButton: {
    marginTop: '24px',
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#00ff88',
    border: '2px solid #00ff88',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default WorkoutMode;

// Made with Bob

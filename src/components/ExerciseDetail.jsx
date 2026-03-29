import { useEffect } from 'react';
import VideoPlayer from './VideoPlayer';
import Timer from './Timer';

const ExerciseDetail = ({ exercise, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const displayInfo = exercise.time 
    ? exercise.time 
    : `${exercise.sets} sets × ${exercise.reps} reps`;

  // Parse time for timer (e.g., "30-45s" -> 30 seconds)
  const getTimerDuration = () => {
    if (!exercise.time) return null;
    const match = exercise.time.match(/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const timerDuration = getTimerDuration();

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div style={styles.content}>
          <div style={styles.header}>
            <h2 style={styles.title}>{exercise.name}</h2>
            <div style={styles.badge}>{displayInfo}</div>
          </div>

          <div style={styles.info}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>💪 Muscles:</span>
              <span style={styles.infoValue}>{exercise.muscles}</span>
            </div>
            {exercise.correctForm && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>✓ Correct Form:</span>
                <span style={styles.infoValue}>{exercise.correctForm}</span>
              </div>
            )}
            {exercise.makeEasier && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>💡 Make easier:</span>
                <span style={styles.infoValue}>{exercise.makeEasier}</span>
              </div>
            )}
            {exercise.makeHarder && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>🔥 Make harder:</span>
                <span style={styles.infoValue}>{exercise.makeHarder}</span>
              </div>
            )}
            {exercise.rest && (
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>⏱ Rest:</span>
                <span style={styles.infoValue}>{exercise.rest}</span>
              </div>
            )}
          </div>

          <div style={styles.videoSection}>
            <VideoPlayer videoFile={exercise.videoFile} />
          </div>

          {timerDuration && (
            <div style={styles.timerSection}>
              <Timer 
                duration={timerDuration} 
                type={exercise.block === 'Stretching' ? 'rest' : 'exercise'}
              />
            </div>
          )}

          <div style={styles.instructions}>
            <p style={styles.instructionText}>
              {exercise.time 
                ? '⏱ Hold this position for the specified time'
                : '🔄 Complete all sets with rest between each set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
    overflowY: 'auto',
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: '16px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    border: '2px solid #2a2a2a',
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    fontSize: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    zIndex: 10,
  },
  content: {
    padding: '40px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  title: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
    flex: 1,
  },
  badge: {
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '32px',
    padding: '20px',
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
  },
  infoItem: {
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
    marginBottom: '32px',
  },
  timerSection: {
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
  },
  instructions: {
    padding: '16px',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    border: '1px solid #3a3a3a',
  },
  instructionText: {
    margin: 0,
    fontSize: '14px',
    color: '#b0b0b0',
    textAlign: 'center',
  },
};

// Add hover effect for close button
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .close-button:hover {
      background-color: #ff4444 !important;
      transform: scale(1.1);
    }
    @media (max-width: 768px) {
      .modal-content {
        padding: 24px !important;
      }
      .modal-title {
        font-size: 24px !important;
      }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default ExerciseDetail;

// Made with Bob

import { useState } from 'react';

const ExerciseCard = ({ exercise, onSelect }) => {
  const [showTip, setShowTip] = useState(false);

  const displayInfo = exercise.time 
    ? exercise.time 
    : `${exercise.sets} × ${exercise.reps}`;

  return (
    <div 
      style={styles.card}
      onClick={() => onSelect(exercise)}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div style={styles.header}>
        <h3 style={styles.name}>{exercise.name}</h3>
        <div style={styles.badge}>{displayInfo}</div>
      </div>
      
      <div style={styles.muscles}>
        <span style={styles.muscleIcon}>💪</span>
        {exercise.muscles}
      </div>

      {showTip && exercise.makeEasier && (
        <div style={styles.tip}>
          <span style={styles.tipIcon}>💡</span>
          <span style={styles.tipText}>Make easier: {exercise.makeEasier}</span>
        </div>
      )}

      <div style={styles.footer}>
        <span style={styles.playIcon}>▶</span>
        <span style={styles.playText}>Click to view video</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    position: 'relative',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    gap: '12px',
  },
  name: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '600',
    color: '#ffffff',
    flex: 1,
  },
  badge: {
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '700',
    whiteSpace: 'nowrap',
  },
  muscles: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#b0b0b0',
    marginBottom: '12px',
  },
  muscleIcon: {
    fontSize: '16px',
  },
  tip: {
    backgroundColor: '#1a1a1a',
    padding: '10px 12px',
    borderRadius: '8px',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#00ff88',
    border: '1px solid #3a3a3a',
  },
  tipIcon: {
    fontSize: '14px',
  },
  tipText: {
    flex: 1,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#666',
    marginTop: 'auto',
  },
  playIcon: {
    fontSize: '12px',
  },
  playText: {
    fontSize: '12px',
  },
};

// Add hover effect via inline style
const cardHoverStyle = `
  .exercise-card:hover {
    transform: translateY(-4px);
    border-color: #00ff88 !important;
    box-shadow: 0 8px 24px rgba(0, 255, 136, 0.2);
  }
`;

// Inject hover styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = cardHoverStyle;
  document.head.appendChild(styleSheet);
}

// Update card style to include class
styles.card.className = 'exercise-card';

export default ExerciseCard;

// Made with Bob

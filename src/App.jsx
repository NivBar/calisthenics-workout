import { useState } from 'react';
import BlockSelector from './components/BlockSelector';
import ExerciseCard from './components/ExerciseCard';
import ExerciseDetail from './components/ExerciseDetail';
import WorkoutMode from './components/WorkoutMode';
import exercisesData from './data/exercises.json';

function App() {
  const [currentBlock, setCurrentBlock] = useState('A');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [workoutMode, setWorkoutMode] = useState(false);

  const blocks = exercisesData.blocks;
  const currentExercises = blocks[currentBlock]?.exercises || [];

  const handleStartWorkout = () => {
    // Get all exercises from all blocks
    const allExercises = Object.values(blocks).flatMap(block => block.exercises);
    setWorkoutMode(true);
  };

  const handleExitWorkout = () => {
    setWorkoutMode(false);
  };

  const getAllExercises = () => {
    return Object.values(blocks).flatMap(block => block.exercises);
  };

  if (workoutMode) {
    return (
      <WorkoutMode 
        exercises={getAllExercises()} 
        onExit={handleExitWorkout}
      />
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>
            <span style={styles.titleIcon}>💪</span>
            Calisthenics Workout
          </h1>
          <p style={styles.subtitle}>
            Full Body Program • Rings + Pull-up Bar
          </p>
        </div>
        <button style={styles.startWorkoutButton} onClick={handleStartWorkout}>
          🚀 Start Full Workout
        </button>
      </header>

      <main style={styles.main}>
        <BlockSelector 
          blocks={blocks}
          currentBlock={currentBlock}
          onBlockChange={setCurrentBlock}
        />

        <div style={styles.blockHeader}>
          <div style={styles.blockTitleRow}>
            <h2 style={styles.blockTitle}>
              {currentBlock === 'Stretching' ? '🧘 ' : ''}
              {blocks[currentBlock]?.name}
            </h2>
            <div style={styles.exerciseCount}>
              {currentExercises.length} {currentExercises.length === 1 ? 'exercise' : 'exercises'}
            </div>
          </div>
          <p style={styles.blockTip}>
            💡 Hover over any exercise to see correct form guidance
          </p>
        </div>

        <div style={styles.exerciseGrid}>
          {currentExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onSelect={setSelectedExercise}
            />
          ))}
        </div>

        {currentExercises.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No exercises in this block</p>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          💡 Tip: Click any exercise to view video demonstration and details
        </p>
        <p style={styles.footerCredit}>
          Built with React + Vite • {new Date().getFullYear()}
        </p>
      </footer>

      {selectedExercise && (
        <ExerciseDetail
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
        />
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    padding: '40px 20px',
    textAlign: 'center',
    borderBottom: '1px solid #2a2a2a',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  headerContent: {
    maxWidth: '800px',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '48px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  titleIcon: {
    fontSize: '48px',
    filter: 'none',
    WebkitTextFillColor: 'initial',
  },
  subtitle: {
    margin: 0,
    fontSize: '18px',
    color: '#b0b0b0',
    fontWeight: '400',
  },
  startWorkoutButton: {
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: '700',
    backgroundColor: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(0, 255, 136, 0.3)',
  },
  main: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 20px 60px',
  },
  blockHeader: {
    marginBottom: '32px',
  },
  blockTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '12px',
  },
  blockTip: {
    margin: 0,
    fontSize: '14px',
    color: '#b0b0b0',
    fontStyle: 'italic',
  },
  blockTitle: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '700',
    color: '#ffffff',
  },
  exerciseCount: {
    fontSize: '16px',
    color: '#b0b0b0',
    padding: '8px 16px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
  },
  exerciseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyText: {
    fontSize: '18px',
    color: '#666',
  },
  footer: {
    borderTop: '1px solid #2a2a2a',
    padding: '32px 20px',
    textAlign: 'center',
    backgroundColor: '#1a1a1a',
  },
  footerText: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#b0b0b0',
  },
  footerCredit: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
  },
};

// Add responsive styles and hover effects
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @media (max-width: 768px) {
      .app-title {
        font-size: 32px !important;
      }
      .exercise-grid {
        grid-template-columns: 1fr !important;
      }
      .block-title {
        font-size: 24px !important;
      }
    }
    
    .start-workout-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 24px rgba(0, 255, 136, 0.4) !important;
    }
    
    .start-workout-button:active {
      transform: translateY(0);
    }
  `;
  document.head.appendChild(styleSheet);
}

export default App;

// Made with Bob
